// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AssemblyVariable {
    function yul_let() public pure returns (uint256 z) {
        assembly {
            let a := 10
            z := 20
        }
    }

    function yul_if(uint256 x) public pure returns (uint256 z) {
        assembly {
            if lt(x, 10) { z := 10 }
            if eq(x, 10) { z := 20 }
            if gt(x, 10) { z := 30 }
        }
    }

    function yul_switch(uint256 x) public pure returns (uint256 z) {
        assembly {
            switch x
            case 1 { z := 10 }
            case 2 { z := 20 }
            case 3 { z := 30 }
            default { z := 40 }
        }
    }

    function min(uint256 x, uint256 y) public pure returns (uint256 z) {
        z = y;
        assembly {
            if lt(x, y) { z := x }
        }
    }

    function max(uint256 x, uint256 y) public pure returns (uint256 z) {
        assembly {
            switch gt(x, y)
            case 1 { z := x }
            default { z := y }
        }
    }

    function yul_revert(uint256 x) public pure {
        assembly {
            if gt(x, 10) { revert(0, 0) }
        }
    }

    function yul_for_loop() public pure returns (uint256 z) {
        assembly {
            for { let i := 0 } lt(i, 10) { i := add(i, 1) } { z := add(z, 2) }
        }
    }

    // x^n when n = 2^k. 2^4=2*2*2*2   || 2^6=2*2*2*2*2*2
    function yul_pow2k(uint256 x, uint256 n) public pure returns (uint256 z) {
        require(x > 0, "x =0");
        assembly {
            if mod(n, 2) { revert(0, 0) }
            switch n
            case 0 { z := 1 }
            default { z := x }
            for {} gt(n, 1) {} {
                if mod(n, 2) { revert(0, 0) }
                z := mul(z, z)
                n := div(n, 2)
            }
        }
    }


    // check for overflow following two the operation
    function yul_add(uint256 x, uint256 y) public pure returns (uint256 z) {
        assembly {
            z := add(x, y)
            if lt(z, x) { revert(0, 0) }
        }
    }

    function yul_mul(uint256 x, uint256 y) public pure returns (uint256 z) {
        assembly {
            switch x
            case 0 { z := 0 }
            default {
                z := mul(x, y)
                if iszero(eq(div(z, x), y)) { revert(0, 0) }
            }
        }
    }
}
