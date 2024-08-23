// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {YulIntro} from "../../src/evm/YulIntro.sol";

contract YulIntroTest is StdInvariant, Test {
    YulIntro public yulIntro;

    function setUp() public {
        yulIntro = new YulIntro();
    }


    function invariant_() public {}

    function test_add() public view {
        uint256 result = yulIntro.add(1, 2);
        assertEq(result, 3);
    }

    function test_yul_types() public view {
        (uint256 a, bool c, address d, bytes memory e) = yulIntro.yul_types();
        assertEq(a, 1);
        assertTrue(c);
        assertEq(d, address(0xaaa));
        assertEq(e.length, 1);
    }
}
