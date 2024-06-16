// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";


// 
contract HelperConfig is Script {
    function getSepoliaNetwork() public view {}

    function getAnvilNetwork() public view {}
}
