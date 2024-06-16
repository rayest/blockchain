// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

// 抽奖合约
contract Raffle is VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    // 自定义错误。这种方式消耗的 gas 相较于 require 更少。
    error Raffle_NotEnoughEtherSent();

    // enum
    enum RaffleState {
        OPEN,
        CALCULATING,
        CLOSED
    }

    uint256 private constant ROLL_IN_PROGRESS = 42; // 随机数生成中
    uint256 private immutable i_entranceFee; // 入场费
    uint256 private immutable i_interval; // 抽奖间隔。单位：秒
    address payable[] public s_players; // 参与者数组
    uint256 private s_lastWinnerPickedAt;

    RaffleState private s_raffleState; // 抽奖状态

    address private s_recentWinner;

    // chainlink VRF 相关参数
    uint256 s_subscriptionId;
    address vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B; // VRF 协调器，即链上的合约地址
    bytes32 s_keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae; // 用于生成随机数的 keyHash，可以在链上查询
    uint32 callbackGasLimit = 40000; // 回调函数的 gas 限制
    uint16 requestConfirmations = 3; // 请求确认数，即需要多少个区块确认
    uint32 numWords = 1; // 随机数的字数

    mapping(uint256 => address) private s_rollers; // 存储随机数对应的地址
    mapping(address => uint256) private s_results; // 存储地址对应的随机数

    // 事件。用于记录用户参与抽奖的行为 & 方便前端监听和检索。
    event EnteredRaffle(address indexed player);
    event WinnerPicked(address indexed winner, uint256 indexed requestId); // 赢家被选出
    event WinnerPicking(uint256 indexed requestId); // 选出赢家

    constructor(
        uint256 entranceFee,
        uint256 interval,
        uint256 subscriptionId
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        i_entranceFee = entranceFee;
        i_interval = interval;
        s_subscriptionId = subscriptionId;
        s_raffleState = RaffleState.OPEN;
        s_lastWinnerPickedAt = block.timestamp;
    }

    // 该函数用于用户参与抽奖。用户需要支付一定的入场费用，然后将用户地址添加到参与者数组中。
    function enterRaffle() external payable {
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughEtherSent();
        }
        if (s_raffleState != RaffleState.OPEN) {
            revert("The raffle is not open at the moment.");
        }

        s_players.push(payable(msg.sender));
        emit EnteredRaffle(msg.sender);
    }

    // 1. 生成随机数
    // 2. 根据随机数选出赢家
    // 3. 定时、自动执行.
    function performUpkeep(bytes calldata /* performData */) external override {
        s_raffleState = RaffleState.CALCULATING;

        // 生成随机数，使用 chainlink VRF
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        emit WinnerPicking(requestId);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    // 用于处理生成的随机数。override 了 VRFConsumerBaseV2Plus 中的同名函数。
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        uint256 indexOfwinner = randomWords[0] % s_players.length;
        address payable winner = s_players[indexOfwinner];
        s_recentWinner = winner;
        s_raffleState = RaffleState.OPEN;

        s_players = new address payable[](0); // 清空参与者数组, 以便下一轮抽奖
        s_lastWinnerPickedAt = block.timestamp;

        (bool success, ) = winner.call{value: address(this).balance}(""); // 将合约中的余额发送给赢家
        if (!success) {
            revert("Failed to send Ether");
        }

        emit WinnerPicked(winner, requestId);
    }

    // 用于检查是否需要执行维护任务。override 了 AutomationCompatibleInterface 中的同名函数。
    // when is the winner picked?
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool timeHasPassed = (block.timestamp - s_lastWinnerPickedAt) >=
            i_interval;

        bool isOpen = s_raffleState == RaffleState.OPEN;
        bool hasBalance = address(this).balance > 0;
        bool hasPlayers = s_players.length > 0;

        upkeepNeeded = timeHasPassed && isOpen && hasBalance && hasPlayers;

        return (upkeepNeeded, "0x0");
    }

    function getRaffleState() public view returns (RaffleState) {
        return s_raffleState;
    }
}
