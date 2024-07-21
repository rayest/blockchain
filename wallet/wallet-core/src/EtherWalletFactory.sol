// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./EtherWallet.sol";

contract EtherWalletFactory {
    address[] public wallets;

    function createWallet() public {
        address wallet = address(new EtherWallet());
        wallets.push(wallet);
    }

    function getWallets() public view returns (address[] memory) {
        return wallets;
    }
}
