// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Not owner");
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit() public payable {
        require(msg.sender == owner, "Not owner");
    }

    receive() external payable {}
}
