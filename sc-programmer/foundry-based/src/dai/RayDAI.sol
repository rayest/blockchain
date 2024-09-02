// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RayDAI is ERC20 {
    constructor() ERC20("RayDAI", "RDAI") {
        _mint(msg.sender, 10000);
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}