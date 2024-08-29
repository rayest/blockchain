// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Wallet {
    address payable public owner;

    event Deposit(address indexed sender, uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Wallet: caller is not owner");
        require(address(this).balance >= amount, "Wallet: insufficient balance");
        payable(owner).transfer(amount);
    }

    function send(uint256 amount) public {
        require(address(this).balance >= amount, "Wallet: insufficient balance");
        (bool ok,) = payable(msg.sender).call{value: amount}(""); // 这是指从合约地址向调用者地址转账
        require(ok, "Wallet: send failed");
    }

    function setOwner(address _owner) public {
        require(msg.sender == owner, "Wallet: caller is not owner");
        owner = payable(_owner);
    }
}
