// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        // 这行代码告诉 Foundry 开始广播接下来的交易
        // 如果没有 startBroadcast()，交易只会在本地模拟执行，而不会实际发送到链上
        vm.startBroadcast();

        counter = new Counter();

        vm.stopBroadcast();
        
    }
}
