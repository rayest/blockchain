// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract DeploySimpleStorage is Script {
    function run() external returns (SimpleStorage) {
        console.log("Hello, World!");
        vm.startBroadcast();
        SimpleStorage simpleStorage = new SimpleStorage(); // new is a keyword to create a new contract
        vm.stopBroadcast();
        return simpleStorage;
    }
}
