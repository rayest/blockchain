// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract TimeAuction {
    uint256 public startFrom = block.timestamp + 1 days;
    uint256 public endAt = block.timestamp + 2 days;

    function bid() external view {
        require(block.timestamp >= startFrom, "TimeAuction: not started yet");
        require(block.timestamp < endAt, "TimeAuction: already ended");
    }

    function end() external view {
        require(block.timestamp >= endAt, "TimeAuction: not ended yet");
    }
}
