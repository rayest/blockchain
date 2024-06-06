// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract AssemblyVariable {
    function yul_let() public pure returns (uint256 z) {
        assembly {
            let a := 100
            z := 200 // when yul_let is called, then 200 will return
        }
    }

    function yul_if(uint256 x) public pure returns (uint256 z) {
        assembly {
            // no else
            if lt(x, 10) {
                z := 100
            }

            if 0 {
                z := 0
            }
        }
    }

    function yul_switch(uint256 x) public pure returns (uint256 z) {
        assembly {
            switch x
            case 1 {
                z := 10
            }
            case 2 {
                z := 20
            }
            default {
                z := 0
            }
        }
    }

    function yul_for() public pure returns (uint256 z) {
        assembly {
            for {
                let i := 0
            } lt(i, 10) {
                i := add(i, 1)
            } {
                z := add(z, 1)
            }
        }
    }

    function yul_while() public pure returns (uint256 z) {
        assembly {
            let i := 0
            for {

            } lt(i, 10) {

            } {
                i := add(i, 1)
                z := add(z, 1)
            }
        }
    }

    function yul_error_revert(uint256 x) public pure {
        assembly {
            if gt(x, 10) {
                revert(0, 0)
            }
        }
    }

    function yul_add(uint256 x, uint256 y) public pure returns (uint256 z) {
        assembly {
            z := add(x, y)
            if lt(z, x) {
                revert(0, 0)
            }
        }
    }

    function yul_mul(uint256 x, uint256 y) public pure returns (uint256 z) {
        assembly {
            switch x
            case 0 {
                z := 0
            }
            default {
                z := mul(x, y)
                if iszero(eq(div(z, x), y)) {
                    revert(0, 0)
                }
            }
        }
    }
}
