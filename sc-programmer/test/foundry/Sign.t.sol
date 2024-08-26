// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";

contract SignTest is StdInvariant, Test {
    function setUp() public {}

    function test_() public {}

    function test_sign() public pure {
        uint256 privateKey = 123;
        address addr = vm.addr(privateKey);

        bytes32 messageHash = keccak256("Secret message");
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, messageHash);

        address signer = ecrecover(messageHash, v, r, s);
        assertEq(signer, addr);
    }
}
