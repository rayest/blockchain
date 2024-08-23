// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {AssemblyVariable} from "../../src/assemly/AssemblyVariable.sol";

contract AssemblyVariableTest is Test {
    AssemblyVariable assemblyVariable;

    function setUp() public {
        assemblyVariable = new AssemblyVariable();
    }

    function test_let() public view {
        uint256 z = assemblyVariable.yul_let();
        assertEq(z, 20);
    }

    function test_if() public view {
        uint256 z = assemblyVariable.yul_if(5);
        assertEq(z, 10);

        z = assemblyVariable.yul_if(10);
        assertEq(z, 20);

        z = assemblyVariable.yul_if(15);
        assertEq(z, 30);
    }

    function test_switch() public view {
        uint256 z = assemblyVariable.yul_switch(1);
        assertEq(z, 10);

        z = assemblyVariable.yul_switch(2);
        assertEq(z, 20);

        z = assemblyVariable.yul_switch(3);
        assertEq(z, 30);

        z = assemblyVariable.yul_switch(4);
        assertEq(z, 40);
    }

    function test_min() public view {
        uint256 z = assemblyVariable.min(5, 10);
        assertEq(z, 5);

        z = assemblyVariable.min(10, 5);
        assertEq(z, 5);
    }

    function test_max() public view {
        uint256 z = assemblyVariable.max(5, 10);
        assertEq(z, 10);

        z = assemblyVariable.max(10, 5);
        assertEq(z, 10);
    }

    function testFail_revert() public view {
        assemblyVariable.yul_revert(20);
    }

    function test_for_loop() public view {
        uint256 z = assemblyVariable.yul_for_loop();
        assertEq(z, 20);
    }

    function test_pow2k() public view {
        uint z = assemblyVariable.yul_pow2k(2, 4);
        assertEq(z, 16);
    }

    function testFail_pow2k() public view {
        assemblyVariable.yul_pow2k(2, 3);
    }


}
