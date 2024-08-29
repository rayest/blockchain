// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console2 as console} from "forge-std/Script.sol";
import {Greeter} from "../src/openzeppelin/Greeter.sol";
import {GreeterV2} from "../src/openzeppelin/GreeterV2.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";

contract UpgradesGreeter is Script {
    function run() external {
        vm.startBroadcast();
        address transparentProxy = Upgrades.deployTransparentProxy(
            "Greeter.sol", msg.sender, abi.encodeCall(Greeter.initialize, (msg.sender, "Hello, world!"))
        );

        Upgrades.upgradeProxy(
            transparentProxy, "GreeterV2.sol", abi.encodeCall(GreeterV2.initialize, (msg.sender, "Hello World again"))
        );

        vm.stopBroadcast();
    }
}
