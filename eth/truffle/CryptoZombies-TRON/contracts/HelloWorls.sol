// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract HelloWorld {
    address public owner;
    event SayHelloEvent();

    function hello(address _owner) public {
        require(_owner == msg.sender);
        emit SayHelloEvent();
    }
}
