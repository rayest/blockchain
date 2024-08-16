// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from "@uniswap/sdk-core";
import { BigNumber, ethers } from "ethers";
import { providers } from "ethers";
import JSBI from "jsbi";

import {
  ERC20_ABI,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  WETH_ABI,
  WETH_CONTRACT_ADDRESS,
} from "./constants";
import { getProvider, getWalletAddress, sendTransaction } from "./providers";
import { toReadableAmount } from "./utils";

export async function getCurrencyBalance(
  provider: providers.Provider,
  address: string,
  currency: Currency
): Promise<string> {
  // Handle ETH directly
  if (currency.isNative) {
    return ethers.utils.formatEther(await provider.getBalance(address));
  }

  // Get currency otherwise
  const ERC20Contract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  );
  const balance: number = await ERC20Contract.balanceOf(address);
  const decimals: number = await ERC20Contract.decimals();

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals);
}

// wraps ETH (rounding up to the nearest ETH for decimal places)
// WETH 是 Wrapped Ether 的缩写，是以太坊上的一种 ERC20 代币，用来代表以太坊。
// 这个函数表示将 ETH 包装成 WETH，number 类型的 eth 参数表示要包装的 ETH 数量
export async function wrapETH(eth: number) {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!provider || !address) {
    throw new Error("Cannot wrap ETH without a provider and wallet address");
  }

  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  );

  const transaction = {
    data: wethContract.interface.encodeFunctionData("deposit"),
    value: BigNumber.from(Math.ceil(eth))
      .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
      .toString(),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  };

  await sendTransaction(transaction);
}

// unwraps ETH (rounding up to the nearest ETH for decimal places)
export async function unwrapETH(eth: number) {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!provider || !address) {
    throw new Error("Cannot unwrap ETH without a provider and wallet address");
  }

  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  );

  const transaction = {
    data: wethContract.interface.encodeFunctionData("withdraw", [
      BigNumber.from(Math.ceil(eth))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  };

  await sendTransaction(transaction);
}
