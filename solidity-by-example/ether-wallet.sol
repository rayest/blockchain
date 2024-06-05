// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // 获取余额
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // 提现
    function withdraw(uint256 _amount) public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(_amount);
    }
}
