// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {EtherWallet} from "../src/EtherWallet.sol";

contract EtherWalletTest is Test {
    EtherWallet public etherWallet;

    function setUp() public {
        etherWallet = new EtherWallet();
    }

    function test_init_balance() public view {
        assertEq(etherWallet.balanceOf(), 0);
    }

    function test_deposit() public {
        etherWallet.deposit{value: 10 ether}();
        assertEq(etherWallet.balanceOf(), 10 * 10 ** 18);
    }

    function test_withdraw() public {
        // 先存入10个 ether
        etherWallet.deposit{value: 5 ether}();
        assertEq(etherWallet.balanceOf(), 5 * 10 ** 18);

        // 再取出 1 个 ether
        uint256 amount = 2 ether;
        etherWallet.withdraw(amount);

        assertEq(etherWallet.balanceOf(), 3 * 10 ** 18);
    }
}
