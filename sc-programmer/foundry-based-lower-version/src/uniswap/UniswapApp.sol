// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "./UniswapFactoryInterface.sol";
import "./UniswapExchangeInterface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UniswapApp {
    UniswapFactoryInterface public factory;

    constructor(address uniswapFactoryAddress) public {
        factory = UniswapFactoryInterface(uniswapFactoryAddress);
    }

    // token is the address of the ERC20 token
    function createExchange(address token) public returns (address exchange) {
        return factory.createExchange(token);
    }

    function getExchange(address token) public view returns (address exchange) {
        return factory.getExchange(token);
    }

    function getToken(address exchange) public view returns (address token) {
        return factory.getToken(exchange);
    }

    function getTokenWithId(uint256 tokenId) public view returns (address token) {
        return factory.getTokenWithId(tokenId);
    }

    // Buy tokens with ETH
    function buy(address token) external payable {
        address exchange = getExchange(token);
        UniswapExchangeInterface exchangeContract = UniswapExchangeInterface(exchange);

        // Calculate the amount of tokens to buy
        uint256 tokenAmount = exchangeContract.getEthToTokenInputPrice(msg.value);

        // Buy tokens: 
        // msg.value is the amount of ETH to spend
        // tokenAmount is the amount of tokens to buy
        // now + 1 days is the deadline
        exchangeContract.ethToTokenTransferInput.value(msg.value)(tokenAmount, now + 1 days, msg.sender);
    }

    // Sell tokens for ETH
    function addLiquility(address token) external payable {
        address exchange = getExchange(token);
        UniswapExchangeInterface exchangeContract = UniswapExchangeInterface(exchange);
        uint tokenAmount = exchangeContract.getEthToTokenInputPrice(msg.value);

        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);

        exchangeContract.addLiquidity.value(msg.value)(tokenAmount, tokenAmount, now + 1 days);
    }
}
