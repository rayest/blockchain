// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AssemblyVariable} from "../src/assemly/AssemblyVariable.sol";

contract AssemblyVariableScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AssemblyVariable av = new AssemblyVariable();

        vm.stopBroadcast();
    }
}
