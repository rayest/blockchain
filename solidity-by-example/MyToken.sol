// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ERC20.sol";
contract MyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) ERC20(name, symbol, decimals) {
        _mint(msg.sender, 100 * 10 ** uint256(decimals));
    }
}
