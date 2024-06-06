// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.24;

contract Factory {
    event Log(address addr);

    function deploy() external {
        bytes memory bytecode = hex"6960ff60005260206000f3600052600a6016f3";
        address addr ;

        assembly {
            addr := create(0, add(bytecode, 0x20), 0x13)
        }

        require (addr != address(0));

        emit Log(addr);
    }
}

interface IContract{
    function getValue() external view returns(uint256);
}



