// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract HelloWorld {
    string public message;

    event MessageUpdated(string oldMessage, string newMessage);

    constructor(string memory _message) {
        message = _message;
    }

    function updateMessage(string memory newMessage) public {
        string memory oldMessage = message;
        message = newMessage;
        emit MessageUpdated(oldMessage, newMessage);
    }
}
