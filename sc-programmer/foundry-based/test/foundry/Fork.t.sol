// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

interface IWETH {
    function balanceOf(address) external view returns (uint256);
    function deposit() external payable;
}

contract ForkTest is StdInvariant, Test {
    IWETH weth;
    IERC20 dai;

    function setUp() public {
        weth = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
        dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    }

    function test_deposit() public {
        uint256 balanceBefore = weth.balanceOf(address(this));
        console.log("WETH balance before: %d", balanceBefore / 1e18);

        weth.deposit{value: 1 ether}();
        console.log("WETH balance after: %d", weth.balanceOf(address(this)) / 1e18);
    }

    function test_dai_deposit() public {
        uint256 totalApply = dai.totalSupply();
        console.log("DAI total supply: %d", totalApply / 1e18);

        address alice = address(123);
        uint256 balanceBefore = dai.balanceOf(alice);
        console.log("Alice balance before: %d", balanceBefore / 1e18);
        
        deal(address(dai), alice, 1000 ether, true);

        console.log("DAI total apply: %d", dai.totalSupply() / 1e18);

        uint256 balanceAfter = dai.balanceOf(alice);
        console.log("Alice balance after: %d", balanceAfter / 1e18);

    }
}
