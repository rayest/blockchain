// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {EVMStorage} from "../../src/evm/EVMStorage.sol";

contract EVMStorageTest is StdInvariant, Test {
    EVMStorage public evmStorage;

    function setUp() public {
        evmStorage = new EVMStorage();
    }

    function test_() public {}

    function invariant_() public {}

    function test_store_load() public {
        evmStorage.store(111, 222, bytes32(uint256(0xababab)));
        (uint256 x, uint256 y, bytes32 z) = evmStorage.load();
        assertEq(x, 111);
        assertEq(y, 222);
        assertEq(z, bytes32(uint256(0xababab)));
    }

    function test_store_load_again() public {
        evmStorage.sstore_agian(333, 444, bytes32(uint256(0xcdcdcd)));
        (uint256 x, uint256 y, bytes32 z) = evmStorage.load_again();
        assertEq(x, 333);
        assertEq(y, 444);
        assertEq(z, bytes32(uint256(0xcdcdcd)));
    }

    function test_load_multi_from_one_slot() public view {
        bytes32 x = evmStorage.load_multi_from_one_slot();
        assertEq(x, bytes32(uint256(0xabcd12345678)));
    }

    function test_bit_mask_extract() public view {
        bytes32 y = evmStorage.bit_mask_extract(3, 8);
        assertEq(y, bytes32(uint256(0x12345678)));
    }

    function test_get_single_slot_from_struct() public view {
        (uint128 x, uint64 y, uint64 z) = evmStorage.get_single_slot_from_struct();
        assertEq(x, 1);
        assertEq(y, 2);
        assertEq(z, 3);
    }

    function test_get_multi_slot_from_struct() public view {
        (uint256 x, uint256 y, uint256 z) = evmStorage.get_multi_slot_from_struct();
        assertEq(x, 11);
        assertEq(y, 22);
        assertEq(z, 33);
    }

    function test_get_slot_from_array() public view {
        uint256 x = evmStorage.get_slot_from_array();
        assertEq(x, 5);
    }

    function test_get_slot_from_array_2() public view {
        uint256 x = evmStorage.get_slot_from_array_2();
        assertEq(x, 11);
    }

    function test_get_slot_from_mapping() public {
        evmStorage.initMap();
        uint256 x = evmStorage.get_slot_from_mapping(address(1));
        assertEq(x, 111);
    }
}
