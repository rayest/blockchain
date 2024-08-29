// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";

contract FFITest is StdInvariant, Test {
    function setUp() public {}

    function test_ffi_cat() public {
        string[] memory cmds = new string[](2);
        cmds[0] = "cat";
        cmds[1] = "ffi.txt";
        bytes memory result = vm.ffi(cmds);
        console.log(string(result));

    }
}
