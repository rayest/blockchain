// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "../contracts/Counter.sol";

contract TestCounter is Counter {
    uint256 balance = 0;

    function echidna_test_pass() public pure returns (bool) {
        return true;
    }

    function echidna_test_fail() public pure returns (bool) {
        return false;
    }

    function echidna_check_balance() public view returns (bool) {
        return (balance > 0);
    }
}
