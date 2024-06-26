// This is the main building block for smart contracts.
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Token {
    // Some string type variables to identify the token.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    string public addtionParam = "rayest";

    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account's balance.
    mapping(address => uint256) balances;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event ON_HELLO(string indexed username);

    /**
     * Contract initialization.
     */
    constructor(string memory _addtionParam) {
        // The totalSupply is assigned to the transaction sender, which is the
        // account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
        addtionParam = _addtionParam;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from *outside*
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false`, the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function hello(string memory username) external returns (string memory) {
        console.log("This is from console, %s", username);
        emit ON_HELLO(username);
        return username;
    }
}
