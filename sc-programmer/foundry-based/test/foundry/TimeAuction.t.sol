// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {console} from "forge-std/console.sol";
import {TimeAuction} from "../../src/foundry/TimeAuction.sol";

contract TimeAuctionTest is StdInvariant, Test {
    TimeAuction public timeAuction;
    uint256 private startFrom;

    function setUp() public {
        timeAuction = new TimeAuction();
        startFrom = block.timestamp;
    }

    function test_bid_fail_before_start_time() public {
        vm.expectRevert("TimeAuction: not started yet");
        timeAuction.bid();
    }

    function test_bid_success() public {
        vm.warp(startFrom + 1 days);
        timeAuction.bid();
    }

    function test_bid_fail_after_end() public {
        vm.warp(startFrom + 2 days);
        vm.expectRevert("TimeAuction: already ended");
        timeAuction.bid();
    }
}
