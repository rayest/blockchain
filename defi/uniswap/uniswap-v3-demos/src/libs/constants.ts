// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token } from "@uniswap/sdk-core";

// Addresses
export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // 这个是 Uniswap V3 的工厂合约地址。 Uniswap V3 的工厂合约地址是固定的，不同的 Uniswap V3 交易对是通过工厂合约的 createPool 方法创建的。
export const QUOTER_CONTRACT_ADDRESS =
  "0x61fFE014bA17989E743c5F6cB21bF9697530B21e"; // 这个是 Uniswap V3 的 Quoter 合约地址。 Quoter 合约是用来计算交易的价格的。

export const QUOTER_CONTRACT_ADDRESS_FOR_QUOTE =
  "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

export const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // 这个是 Uniswap V3 的 SwapRouter 合约地址。 SwapRouter 合约是用来执行交易的。
export const WETH_CONTRACT_ADDRESS =
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // 这个是 WETH 的合约地址。 WETH 是 Wrapped Ether 的缩写，是以太坊上的一种 ERC20 代币，用来代表以太坊。

// Currencies and Tokens
// Token 是 Uniswap V3 SDK 中的一个类，用来表示一个 ERC20 代币。 Token 类的构造函数接受 5 个参数，分别是 chainId、address、decimals、symbol 和 name。
export const WETH_TOKEN = new Token(
  SupportedChainId.MAINNET,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "Wrapped Ether"
);

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  6,
  "USDC",
  "USD//C"
);

// ABI's
export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address _spender, uint256 _value) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const WETH_ABI = [
  // Wrap ETH
  "function deposit() payable",

  // Unwrap ETH
  "function withdraw(uint wad) public",
];

// Transactions
export const MAX_FEE_PER_GAS = 100000000000;
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000;
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000;
