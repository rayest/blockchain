// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FundMe} from "../src/FundMe.sol";

contract DeployFundMe is Script {
    function run() external returns (FundMe){
        console.log("Deploying FundMe contract");
        vm.startBroadcast();
        FundMe fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        console.log("FundMe contract deployed at address: ", address(fundMe));
        vm.stopBroadcast();
        return fundMe;
    }
}
