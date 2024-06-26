// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract RoyaltyToken is ERC20 {
    address public royaltyAddress;
    uint256 public royaltyPercentage; // 类似于费率

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        uint256 _royaltyPercentage,
        uint256 _initialSupply
    ) ERC20(_name, _symbol, _decimal) {
        royaltyAddress = msg.sender;
        royaltyPercentage = _royaltyPercentage;
        _mint(msg.sender, _initialSupply);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        uint256 royaltyAmount = (amount * royaltyPercentage) / 100;
        balanceOf[msg.sender] -= amount;
        unchecked {
            balanceOf[to] += amount - royaltyAmount;
            balanceOf[royaltyAddress] += royaltyAmount;
        }

        emit Transfer(msg.sender, royaltyAddress, royaltyAmount);
        emit Transfer(msg.sender, to, amount - royaltyAmount);
        return true;
    }
}
