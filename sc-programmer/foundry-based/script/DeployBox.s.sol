// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Box} from "../src/openzeppelin/Box.sol";
import {ERC1967Proxy} from "openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// ERC1967
contract DeployBox is Script {
    function run() external returns (address) {
        address proxy = deployBox();
        return proxy;
    }

    function deployBox() public returns (address) {
        vm.startBroadcast();
        Box box = new Box();
        ERC1967Proxy proxy = new ERC1967Proxy(address(box), "");
        Box(address(proxy)).initialize();
        vm.stopBroadcast();
        return address(proxy);
    }
}
