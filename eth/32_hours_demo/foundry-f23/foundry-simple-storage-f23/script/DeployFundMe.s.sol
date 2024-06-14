// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FundMe} from "../src/FundMe.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployFundMe is Script {
    function run() external returns (FundMe){
        console.log("Deploying FundMe contract");
        HelperConfig helpconfig = new HelperConfig();
        address priceFeed = helpconfig.activeNetworkConfig();

        vm.startBroadcast();
        FundMe fundMe = new FundMe(priceFeed);
        console.log("FundMe contract deployed at address: ", address(fundMe));
        vm.stopBroadcast();
        return fundMe;
    }
}
