// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {RayDAIApp} from "../src/dai/RayDAIApp.sol";
import {RayDAI} from "../src/dai/RayDAI.sol";

contract RayDAIAppScript is Script {
    RayDAIApp public rayDAIApp;
    RayDAI public rayDAI;

    address account = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // 部署 RayDAI 合约, 并为调用者铸造 10000 个 rayDAI
        rayDAI = new RayDAI();
        rayDAIApp = new RayDAIApp(address(rayDAI));

        // 给 rayDAIApp 发送 1000 个 rayDAI
        rayDAI.faucet(address(rayDAIApp), 1000);

        // account 初始余额
        console.log("account balance before: ", rayDAI.balanceOf(account));
        console.log("rayDAI balance before: ", rayDAI.balanceOf(address(rayDAI)));
        console.log("rayDAIApp balance before: ", rayDAI.balanceOf(address(rayDAIApp)));

        // 从 rayDAIApp 向 account 转账 100 个 rayDAI
        rayDAIApp.transferTo(account, 100);

        // current 余额
        console.log("account balance after: ", rayDAI.balanceOf(account));
        console.log("rayDAI balance after: ", rayDAI.balanceOf(address(this)));
        console.log("rayDAIApp balance after: ", rayDAI.balanceOf(address(rayDAIApp)));

        vm.stopBroadcast();
    }
}
