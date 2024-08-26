// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {Calculator} from "../../src/foundry/Calculator.sol";

contract CalculatorTest is StdInvariant, Test {
    Calculator calculator;

    function setUp() public {
        calculator = new Calculator();
    }

    function test_() public {}

    function invariant_() public {}

    // fuzz test: 边界性、随机性
    function test_fuzz_add(uint256 a, uint256 b) public view {
        uint256 result = calculator.add(a, b);

        // 因为没有控制数据的溢出，所以测试会有失败的情况
        console.log("result: %d", result);
    }
}
