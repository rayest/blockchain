// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";

interface IWETH {
    function balanceOf(address) external view returns (uint256);
    function deposit() external payable;
}

contract ForkTest is StdInvariant, Test {
    IWETH weth;

    function setUp() public {
        weth = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    }

    function test_deposit() public {
        uint256 balanceBefore = weth.balanceOf(address(this));
        console.log("WETH balance before: %d", balanceBefore / 1e18);

        weth.deposit{value: 1 ether}();
        console.log("WETH balance after: %d", weth.balanceOf(address(this)) / 1e18);
    }
}
