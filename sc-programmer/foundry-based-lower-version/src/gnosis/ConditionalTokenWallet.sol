// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "./IERC1155.sol";
import "./IConditionalTokens.sol";

contract ConditionalTokenWallet is IERC1155Receiver {
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

    function redeemTokens(bytes32 conditionId, uint256[] calldata indexSets) external {
        conditionalTokens.redeemPositions(dai, bytes32(0), conditionId, indexSets);
    }

    function transferDai(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can transfer DAI");
        dai.transfer(to, amount);
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
