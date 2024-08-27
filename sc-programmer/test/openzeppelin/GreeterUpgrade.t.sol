// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {Greeter} from "../../src/openzeppelin/Greeter.sol";
import {GreeterV2} from "../../src/openzeppelin/GreeterV2.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";

contract GreeterUpgradeTest is StdInvariant, Test {
    function setUp() public {}

    // 透明代理模式
    function testTransparent() public {
        address proxy = Upgrades.deployTransparentProxy(
            "Greeter.sol", msg.sender, abi.encodeCall(Greeter.initialize, (msg.sender, "Hello, world!"))
        );

        Greeter instance = Greeter(proxy);
        address implAddressV1 = Upgrades.getImplementationAddress(proxy);
        address adminAddress = Upgrades.getAdminAddress(proxy);

        assertFalse(adminAddress == address(0));
        assertEq(instance.greeting(), "Hello, world!");

        // 升级
        Upgrades.upgradeProxy(proxy, "GreeterV2.sol", abi.encodeCall(GreeterV2.resetGreeting, ()), msg.sender);
        address implAddressV2 = Upgrades.getImplementationAddress(proxy);

        assertEq(Upgrades.getAdminAddress(proxy), adminAddress);
        assertEq(instance.greeting(), "resetted greeting");
        assertFalse(implAddressV1 == implAddressV2);
    }
}
