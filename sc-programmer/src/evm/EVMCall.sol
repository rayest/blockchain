// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract EVMCall {
    function call_evm_counter_contract(address _addr, bytes calldata _data) external returns (bytes memory) {
        assembly {
            // load free memory pointer
            let p := mload(0x40)
            // copy _data to memory
            calldatacopy(p, _data.offset, _data.length)
            // call contract
            let success := call(gas(), _addr, 0, p, _data.length, 0, 0)
            // get result size
            if iszero(success) {
                revert(0, 0)
            }
            let return_data_size := returndatasize()
            mstore(p, 0x20)
            mstore(add(p, 0x20), return_data_size)
            returndatacopy(add(p, 0x40), 0, return_data_size)
            return (p, add(0x40, return_data_size))
        }
    }
}