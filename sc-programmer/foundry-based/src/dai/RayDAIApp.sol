// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RayDAIApp {
    IERC20 public dai;

    constructor(address _dai) {
        dai = IERC20(_dai);
    }

    function transferTo(address receipient, uint256 amount) external {
        dai.transfer(receipient, amount);
    }
}
