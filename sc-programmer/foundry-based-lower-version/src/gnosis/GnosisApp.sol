// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IConditionalTokens.sol";
import "./IERC1155.sol";

contract GnosisApp {
    IERC20 dai;
    IConditionalTokens conditionalTokens;
    address public oracle;
    address public owner;

    mapping(bytes32 => mapping(uint256 => uint256)) public tokenBalance;

    constructor(address _dai, address _conditionalTokens, address _oracle) public {
        dai = IERC20(_dai);
        conditionalTokens = IConditionalTokens(_conditionalTokens);
        oracle = _oracle;
        owner = msg.sender;
    }

    // 创建一个 
    function createBet(bytes32 questionId, uint256 amount) public {
        // 创建条件
        conditionalTokens.prepareCondition(oracle, questionId, 3);

        bytes32 conditionId = conditionalTokens.getConditionId(oracle, questionId, 3);

        uint256[] memory partition = new uint256[](2);
        partition[0] = 1;
        partition[1] = 2;

        dai.approve(address(conditionalTokens), amount);

        // 分割代币
        conditionalTokens.splitPosition(dai, bytes32(0), conditionId, partition, amount);

        tokenBalance[conditionId][0] = amount;
        tokenBalance[conditionId][1] = amount;
    }

    function transferTokens(bytes32 questionId, uint256 indexSet, address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can transfer tokens");
        require(tokenBalance[questionId][indexSet] >= amount, "Not enough tokens to transfer");

        bytes32 conditionId = conditionalTokens.getConditionId(oracle, questionId, 3);

        bytes32 collectionId = conditionalTokens.getCollectionId(bytes32(0), conditionId, indexSet);

        uint256 positionId = conditionalTokens.getPositionId(dai, collectionId);

        conditionalTokens.safeTransferFrom(address(this), to, positionId, amount, "");
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data)
        external
        returns (bytes4)
    {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }
}
