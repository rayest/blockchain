// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {MyToken} from "../../src/foundry/MyToken.sol";

contract MyTokenTest is StdInvariant, Test {
    event TransferFromTo(address indexed from, address indexed to, uint256 amount);

    MyToken public myToken;

    function setUp() public {
        myToken = new MyToken();
    }

    function test_() public {}

    function invariant_total_supply() public view {
        assertEq(myToken.totalSupply(), 100);
    }

    function test_event_transfer() public {
        vm.expectEmit(true, true, false, true);
        emit TransferFromTo(address(this), address(123), 456);
        myToken.transfer(address(this), address(123), 456);
    }
}
