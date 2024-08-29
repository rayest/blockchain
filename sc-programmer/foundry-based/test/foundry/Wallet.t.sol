// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {Wallet} from "../../src/foundry/Wallet.sol";

contract WalletTest is StdInvariant, Test {
    Wallet public wallet;

    function setUp() public {
        wallet = new Wallet{value: 1e18}();
    }


    function test_eth_balance() public view {
        console.log("Eth balance: ", address(wallet).balance / 1e18);
    }

    function test_send_eth() public {
        deal(address(1), 100);
        assertEq(100, address(1).balance);

        hoax(address(1), 100); // set sender is address 1 and eth balance is 100
        wallet.send(13); // send 13 etheth from wallet to address 1
        assertEq(address(1).balance, 113);
    }

    function test_send_eth_when_balance_not_enough() public {
        // 指定地址的余额，还将当前的 msg.sender 模拟为该地址
        hoax(address(1), 1);
        vm.expectRevert("Wallet: insufficient balance");
        wallet.send(100e18);
    }
}