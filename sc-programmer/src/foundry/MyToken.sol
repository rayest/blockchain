// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "solmate/tokens/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20("Rayest", "RAY", 18), Ownable {
    constructor() Ownable(msg.sender) {}

    event TransferFromTo(address indexed from, address indexed to, uint256 amount);

    function transfer(address from, address to, uint256 value) public {
        emit TransferFromTo(from, to, value);
    }
}
