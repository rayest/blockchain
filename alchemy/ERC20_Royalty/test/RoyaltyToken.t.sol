// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RoyaltyToken} from "../src/RoyaltyToken.sol";

contract RoyaltyTokenTest is Test {
    RoyaltyToken public token;
    uint256 public initialSupply = 10000;
    uint256 public royaltyPercentage = 2;

    function setUp() public {
        token = new RoyaltyToken("RoyaltyToken", "RT", 18, royaltyPercentage, initialSupply);
    }

    function testTransfer() public {
        address alice = address(1);
        address bob = address(2);

        token.transfer(bob, 1000); // sender 向 bob 转账 1000，2% 的费率，20 会转给 royaltyAddress，980 会转给 bob
        assertEq(token.balanceOf(bob), 980);
        assertEq(token.balanceOf(address(this)), 9020);

        hoax(bob); // 这个 hoax 用于模拟 bob 向 alice 转账，这里不会触发 royalty
        token.transfer(alice, 100);
        assertEq(token.balanceOf(alice), 98);
        assertEq(token.balanceOf(bob), 880);
        assertEq(token.balanceOf(address(this)), 9022);

    }
}
