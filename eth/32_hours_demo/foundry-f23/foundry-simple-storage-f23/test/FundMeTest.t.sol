// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";

import {FundMe} from "../src/FundMe.sol";
import {DeployFundMe} from "../script/DeployFundMe.s.sol";

contract FundMeTest is Test {
    FundMe public fundMe;

    address USER = makeAddr("user"); // 0x
    uint256 constant SEND_AMOUNT = 0.1 ether;
    uint256 constant STARTING_BALANCE = 10 ether;

    function setUp() public {
        // fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        DeployFundMe deployFundMe = new DeployFundMe();
        fundMe = deployFundMe.run();
        vm.deal(USER, STARTING_BALANCE);
    }

    function test_minium() public view {
        assertEq(fundMe.MINIMUM_USD(), 5 * 10 ** 18);
    }

    function test_ownerIsMsgSender() public view {
        assertEq(fundMe.i_owner(), msg.sender);
    }

    function test_version() public view {
        assertEq(fundMe.getVersion(), 4);
    }

    function test_fundFailsWithoutEnoughETH() public {
        vm.expectRevert();
        fundMe.fund();
    }

    function test_fundUpdatesFUndedDataStructure() public {
        vm.prank(USER); //the next tx will be sent by USER
        fundMe.fund{value: SEND_AMOUNT}();
        uint256 amountFunded = fundMe.getAddressToAmountFunded(USER);

        assertEq(amountFunded, SEND_AMOUNT);
    }
}
