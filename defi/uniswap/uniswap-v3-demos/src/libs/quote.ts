import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

import { ethers } from "ethers";
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS_FOR_QUOTE,
} from "./constants";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

import { getProvider } from "../libs/providers";
import { fromReadableAmount, toReadableAmount } from "./utils";
import { CurrentConfig } from "../config";
import { computePoolAddress } from "@uniswap/v3-sdk";

export async function quote(): Promise<string> {
  const quoteContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS_FOR_QUOTE,
    Quoter.abi,
    getProvider()
  );

  const poolConstants = await getPoolConstants();

  const quotedAmountOut = await quoteContract.callStatic.quoteExactOutputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    0
  );

  return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals);
}

async function getPoolConstants(): Promise<{
  token0: string;
  token1: string;
  fee: number;
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  });

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  );

  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return {
    token0,
    token1,
    fee,
  };
}
