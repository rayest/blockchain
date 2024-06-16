// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Raffle} from "../src/Raffle.sol";

contract RaffleTest is Test {
    Raffle public raffle;

    function setUp() public {
        raffle = new Raffle(
            0.1 ether,
            60,
            15122292447905183173860052951987148703426456103110295635015348087636627454444
        );
    }

    function test_EnterRaffle() public {
        vm.deal(address(this), 1 ether);
        raffle.enterRaffle{value: 0.1 ether}();
        assertEq(raffle.s_players(0), address(this));
    }

    function test_PickWinner() public {
        vm.deal(address(this), 1 ether);
        raffle.enterRaffle{value: 0.1 ether}();
        raffle.performUpkeep(bytes("0x"));
    }

}
