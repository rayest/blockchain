// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";

contract DeployRaffle is Script {
    function setUp() public {}

    function run() public {
        Raffle raffle = new Raffle(0.1 ether, 60, 15122292447905183173860052951987148703426456103110295635015348087636627454444);
    }
}
