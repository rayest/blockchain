// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {EnumerableMap} from
    "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/utils/structs/EnumerableMap.sol";
import {SafeERC20} from
    "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from
    "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";

contract ProgrammableDefensiveTokenTransfers is CCIPReceiver, OwnerIsCreator {
    using EnumerableMap for EnumerableMap.Bytes32ToUintMap;
    using SafeERC20 for IERC20;

    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);
    error NothingToWithdraw();
    error FailToWithdrawEth(address owner, address target, uint256 value);
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector);
    error SourceChainNotAllowed(uint64 sourceChainSelector);
    error SenderNotAllowed(address sender);
    error InvalidReceiverAddress();
    error OnlySelf();
    error ErrorCase();
    error MessageNotFailed(bytes32 messageId);

    enum ErrorCode {
        RESOLVED,
        FAILED
    }

    struct FiailedMessage {
        bytes32 messageId;
        ErrorCode errorCode;
    }

    event MessageSent(
        bytes32 indexed messageId,
        uint64 destinationChainSelector,
        address indexed receiver,
        string text,
        address token,
        uint256 tokenAmount,
        address feeToken,
        uint256 fees
    );

    // 源链的选择器
    // 来自源链的发送者
    // 文本消息
    // 被转移的代币地址
    // 被转移的代币数量
    event MessageReceived( // 消息ID
        bytes32 indexed messageId,
        uint64 indexed sourceChainSelector,
        address indexed sender,
        string text,
        address token,
        uint256 tokenAmount
    );

    event MessageFailed(bytes32 indexed messageId, bytes reason);
    event MessageRecovered(bytes32 indexed messageId);

    bytes32 private s_lastReceivedMessageId; // 存储最后接受的消息ID
    address private s_lastReceivedTokenAddress; // 存储最后接受的代币地址
    uint256 private s_lastReceivedTokenAmount; // 存储最后接受的数量
    string private s_lastReceivedText; // 存储最后接受的文本消息

    mapping(uint64 => bool) private allowlistedDestinationChains; // 用于跟踪允许的目标链
    mapping(uint64 => bool) private allowlistedSourceChains; // 用于跟踪允许的源链
    mapping(address => bool) private allowlistedSenders; // 用于跟踪允许的发送者

    IERC20 private s_linkToken; // 存储LINK代币地址

    mapping(bytes32 messageId => Client.Any2EVMMessage contents) public s_messageContents; // 用于存储失败的消息内容

    EnumerableMap.Bytes32ToUintMap internal s_failedMessages; // 包含失败消息及其状态

    bool internal s_simRevert = false; // 用于模拟消息处理函数中的撤销

    // 构造函数. 初始化路由器和 LINK 代币地址
    constructor(address _router, address _link) CCIPReceiver(_router) {
        s_linkToken = IERC20(_link);
    }

    // 检查给定的目标链是否在允许列表中
    modifier onlyAllowlistedDestinationChain(uint64 _destinationChainSelector) {
        if (!allowlistedDestinationChains[_destinationChainSelector]) {
            revert DestinationChainNotAllowlisted(_destinationChainSelector);
        }
        _;
    }

    // 检查给定的源链是否在允许列表中、发送者是否在允许列表中
    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!allowlistedSourceChains[_sourceChainSelector]) {
            revert SourceChainNotAllowed(_sourceChainSelector);
        }
        if (!allowlistedSenders[_sender]) {
            revert SenderNotAllowed(_sender);
        }
        _;
    }

    // 检查接收者地址是否有效
    modifier validateReceiver(address _receiver) {
        if (_receiver == address(0)) {
            revert InvalidReceiverAddress();
        }
        _;
    }

    // 检查是否只有自己
    modifier onlySelf() {
        if (msg.sender != address(this)) {
            revert OnlySelf();
        }
        _;
    }

    // 更新目标链的交易允许状态。只有合约所有者可以调用
    function allowlistDestinationChain(uint64 _destinationChainSelector, bool allowed) external onlyOwner {
        allowlistedDestinationChains[_destinationChainSelector] = allowed;
    }

    // 更新源链的交易允许状态。只有合约所有者可以调用
    function allowlistSourceChain(uint64 _sourceChainSelector, bool allowed) external onlyOwner {
        allowlistedSourceChains[_sourceChainSelector] = allowed;
    }

    function allowlistSender(address _sender, bool allowed) external onlyOwner {
        allowlistedSenders[_sender] = allowed;
    }

    // 向目标链上的接收者发送数据和转移代币
    // 使用 LINK 代币支付费用
    function sendMessagePayLink(
        uint64 _destinationChainSelector,
        address _receiver,
        string calldata _text,
        address _token,
        uint256 _tokenAmount
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        validateReceiver(_receiver)
        returns (bytes32 messageId)
    {
        // 在内存中创建一个结构体
        Client.EVM2AnyMessage memory evm2AnyMessage =
            _buildCCIPMessage(_receiver, _text, _token, _tokenAmount, address(s_linkToken));

        // 初始化一个路由器
        IRouterClient router = IRouterClient(this.getRouter());

        // 获取消息的费用
        uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);

        if (fees > s_linkToken.balanceOf(address(this))) {
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);
        }

        // 批准路由器代表合约转移 LINK 代币。它将花费费用中的 LINK 代币
        s_linkToken.approve(address(router), fees);

        // 批准路由器代表合约花费给定数量的代币。它将花费给定数量的代币
        IERC20(_token).approve(address(router), _tokenAmount);

        // 通过路由器发送消息，并存储返回消息的 ID
        messageId = router.ccipSend(_destinationChainSelector, evm2AnyMessage);

        // 发出一个事件
        emit MessageSent(
            messageId, _destinationChainSelector, _receiver, _text, _token, _tokenAmount, address(s_linkToken), fees
        );

        return messageId;
    }

    // 向目标链上的接收者发送数据和转移代币
    // 使用 原生 gas 支付费用
    function sendMessagePayNative(
        uint64 _destinationChainSelector,
        address _receiver,
        string calldata _text,
        address _token,
        uint256 _tokenAmount
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        validateReceiver(_receiver)
        returns (bytes32 messageId)
    {
        // 在内存中创建一个结构体
        Client.EVM2AnyMessage memory evm2AnyMessage =
            _buildCCIPMessage(_receiver, _text, _token, _tokenAmount, address(0));

        // 初始化一个路由器
        IRouterClient router = IRouterClient(this.getRouter());

        // 获取消息的费用
        uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);
        if (fees > address(this).balance) {
            revert NotEnoughBalance(address(this).balance, fees);
        }

        // 批准路由器代表合约花费给定数量的代币。它将花费给定数量的代币
        IERC20(_token).approve(address(router), _tokenAmount);

        // 通过路由器发送消息，并存储返回消息的 ID
        messageId = router.ccipSend(_destinationChainSelector, evm2AnyMessage);

        // 发出一个事件
        emit MessageSent(messageId, _destinationChainSelector, _receiver, _text, _token, _tokenAmount, address(0), fees);

        return messageId;
    }

    // 构建一个 CCIP 消息
    function _buildCCIPMessage(
        address _receiver,
        string calldata _text,
        address _token,
        uint256 _tokenAmount,
        address _feeTokenAddress
    ) private pure returns (Client.EVM2AnyMessage memory) {
        // 设置代币数量
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount(_token, _tokenAmount);
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encode(_text),
            tokenAmounts: tokenAmounts,
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 400_000})),
            feeToken: _feeTokenAddress
        });

        return evm2AnyMessage;
    }

    // 返回最后接受到的消息的详细信息
    function getLastReceivedMessage()
        public
        view
        returns (bytes32 messageId, address tokenAddress, uint256 tokenAmount, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedTokenAddress, s_lastReceivedTokenAmount, s_lastReceivedText);
    }

    // 检索失败消息的分页列表
    function getFailedMessages(uint256 _offset, uint256 _limit)
        external
        view
        returns (FiailedMessage[] memory failedMessages)
    {
        uint256 length = s_failedMessages.length();

        // 计算实际返回的项目数量（不能超过总长度或者请求的限制）
        uint256 returnLength = _offset + _limit > length ? length - _offset : _limit;
        failedMessages = new FiailedMessage[](returnLength);

        for (uint256 i = 0; i < returnLength; i++) {
            (bytes32 messageId, uint256 errorCode) = s_failedMessages.at(_offset + i);
            failedMessages[i] = FiailedMessage({messageId: messageId, errorCode: ErrorCode(errorCode)});
        }

        return failedMessages;
    }

    // ccip 路由器的调用的入口点
    function ccipReceive(Client.Any2EVMMessage calldata any2EvmMessage)
        external
        override
        onlyRouter
        onlyAllowlisted(any2EvmMessage.sourceChainSelector, abi.decode(any2EvmMessage.sender, (address)))
    {
        try this.processMessage(any2EvmMessage) {}
        catch (bytes memory err) {
            s_failedMessages.set(any2EvmMessage.messageId, uint256(ErrorCode.FAILED));
            s_messageContents[any2EvmMessage.messageId] = any2EvmMessage;
            emit MessageFailed(any2EvmMessage.messageId, err);
            return;
        }
    }

    // 处理消息
    function processMessage(Client.Any2EVMMessage calldata any2EVMMessage)
        external
        onlySelf
        onlyAllowlisted(any2EVMMessage.sourceChainSelector, abi.decode(any2EVMMessage.sender, (address)))
    {
        // 这里是测试的，模拟撤销
        if (s_simRevert) {
            revert ErrorCase();
        }
        _ccipReceive(any2EVMMessage);
    }

    function _ccipReceive(Client.Any2EVMMessage memory any2EVMMessage) internal override {
        s_lastReceivedMessageId = any2EVMMessage.messageId;
        s_lastReceivedText = abi.decode(any2EVMMessage.data, (string)); // 解码发送的文本

        // 这里是一次转移一个代币，可以转移多个代币
        s_lastReceivedTokenAddress = any2EVMMessage.destTokenAmounts[0].token;
        s_lastReceivedTokenAmount = any2EVMMessage.destTokenAmounts[0].amount;
        emit MessageReceived(
            any2EVMMessage.messageId,
            any2EVMMessage.sourceChainSelector,
            abi.decode(any2EVMMessage.sender, (address)),
            abi.decode(any2EVMMessage.data, (string)),
            any2EVMMessage.destTokenAmounts[0].token,
            any2EVMMessage.destTokenAmounts[0].amount
        );
    }

    // 允许所有者尝试失败的消息，以解锁相关的代币
    function retryFailedMessage(bytes32 messageId, address tokenReceiver) external onlyOwner {
        if (s_failedMessages.get(messageId) != uint256(ErrorCode.FAILED)) {
            revert MessageNotFailed(messageId);
        }

        // 将错误代码设置为 resolved，以禁止重新进入和多次重试同一个失败消息
        s_failedMessages.set(messageId, uint256(ErrorCode.RESOLVED));

        Client.Any2EVMMessage memory message = s_messageContents[messageId];

        // 在这里，暂时处理一次发送一个代币，可以处理多个代币
        // 将关联的代币转移到指定的接受者作为九年级的逃生方式
        IERC20(message.destTokenAmounts[0].token).safeTransfer(tokenReceiver, message.destTokenAmounts[0].amount);

        emit MessageRecovered(messageId);
    }

    // 允许所有者切换模拟撤销的测试
    function setRevert(bool simRevert) external onlyOwner {
        s_simRevert = simRevert;
    }

    // 接收的以太的默认地址
    receive() external payable {}

    // 允许合约所有者从合约中提取全部以太余额
    // 如果没有资金可提取或者转账失败，该函数将撤销
    function withdraw(address _beneficiary) public onlyOwner {
        uint256 amount = address(this).balance;
        if (amount == 0) revert NothingToWithdraw();

        (bool sent,) = _beneficiary.call{value: amount}("");
        if (!sent) revert FailToWithdrawEth(msg.sender, _beneficiary, amount);
    }

    // 允许合约所有者提取特定 ERC20 代币的所有代币
    function withdrawToken(address _beneficiary, address _token) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();

        // 将代币转移到指定受益人地址
        IERC20(_token).safeTransfer(_beneficiary, amount);
    }
}
