// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {EVMMemory} from "../../src/evm/EVMMemory.sol";

contract EVMMemoryTest is StdInvariant, Test {
    EVMMemory public evmMemory;

    function setUp() public {
        evmMemory = new EVMMemory();
    }

    function test_() public {}

    function invariant_() public {}

    function test_m_load_default() public view {
        (bytes32 x, bytes32 y, bytes32 z) = evmMemory.m_load_default();
        assertEq(x, bytes32(uint256(0)));
        assertEq(y, bytes32(uint256(0x0000000000000000000000000000000000000000000000000000000000000080)));
        assertEq(z, bytes32(uint256(0)));
    }

    function test_m_store_and_load() public view {
        bytes32 value = bytes32(uint256(0x12345678));
    }

    function test_m_free() public view {
        (uint256 value_40, uint256 value_80) = evmMemory.m_free();
        assertEq(value_40, 128);
        assertEq(value_80, 0);
    }

    function test_alloc_memo() public view {
        uint256 gasCost = evmMemory.alloc_memo(10);
        console.log("gasCost: ", gasCost);
    }

    function test_read_struct() public view {
        (uint256 x, uint256 y, uint256 z) = evmMemory.read_struct();
        assertEq(x, 1);
        assertEq(y, 2);
        assertEq(z, 3);
    }

    function test_write_struct() public view {
        (uint256 x, uint32 y, uint32 z, bytes32 free_memory_pointer) = evmMemory.write_struct();
        assertEq(x, 11);
        assertEq(y, 22);
        assertEq(z, 33);
        assertEq(free_memory_pointer, bytes32(uint256(0xe0)));
    }

    function test_read_array() public view {
        (bytes32 p, uint256 len, uint256 x, uint256 y, uint256 z) = evmMemory.read_array();
        assertEq(p, bytes32(uint256(0x80)));
        assertEq(len, 3);
        assertEq(x, 1);
        assertEq(y, 2);
        assertEq(z, 3);
    }

    function test_write_array() public view {
        (bytes32 p, uint256[] memory arr) = evmMemory.write_array();
        assertEq(p, bytes32(uint256(0x80)));
        assertEq(arr[0], 11);
        assertEq(arr[1], 22);
        assertEq(arr[2], 33);
    }

    function test_return_values_hault() public view {
        (uint256 x, uint256 y) = evmMemory.return_values_hault();
        assertEq(x, 11);
        assertEq(y, 22);
    }

    function test_return_dynamic_array() public view {
        uint256[] memory arr = evmMemory.return_dynamic_array();
        assertEq(arr.length, 3);
        assertEq(arr[0], 11);
        assertEq(arr[1], 22);
        assertEq(arr[2], 33);
    }
}
