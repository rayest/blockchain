// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {EVMCallCounter} from "../../src/evm/EVMCallCounter.sol";
import {EVMCall} from "../../src/evm/EVMCall.sol";

contract EVMCallTest is StdInvariant, Test {
    EVMCallCounter public evmCallCounter;
    EVMCall public evmCall;

    function setUp() public {
        evmCallCounter = new EVMCallCounter();
        evmCall = new EVMCall();
    }

    function test_() public {}

    function invariant_() public {}

    function test_evm_call() public {
        bytes memory res =
            evmCall.call_evm_counter_contract(address(evmCallCounter), abi.encodeCall(EVMCallCounter.inc, ()));
        console.logBytes(res);
        uint256 count = abi.decode(res, (uint256));
        assertEq(count, 2);
    }
}
