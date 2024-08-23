// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

contract YulIntro {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 result = 0;
        assembly {
            result := add(a, b)
        }
        return result;
    }

    // types
    function yul_types() public pure returns (uint256 a, bool c, address d, bytes memory e) {
        assembly {
            a := 1
            c := true
            d := 0xaaa
            e := mload(0x40)
            mstore(e, 0x20)
            mstore(add(e, 0x20), 0x40)
        }
        return (a, c, d, e);
    }
}
