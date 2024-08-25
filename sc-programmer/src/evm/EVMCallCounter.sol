// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract EVMCallCounter {
    uint256 public count;

    function inc() public returns (uint256) {
        count += 2;
        return count;
    }
}
