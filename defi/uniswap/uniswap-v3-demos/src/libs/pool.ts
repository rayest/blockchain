import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { computePoolAddress } from "@uniswap/v3-sdk";
import { ethers } from "ethers";

import { CurrentConfig } from "../config";
import { POOL_FACTORY_CONTRACT_ADDRESS } from "./constants";
import { getProvider } from "./providers";
import { Token } from "@uniswap/sdk-core";

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumber;
  liquidity: ethers.BigNumber;
  tick: number;
}

export async function getPoolInfo(tokenZero: Token, tokenOne: Token): Promise<PoolInfo> {
  const provider = getProvider();
  if (!provider) {
    throw new Error("No provider");
  }

  // 计算当前 pool 的地址。pool 地址是根据工厂合约地址、tokenA、tokenB 和手续费计算出来的
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: tokenZero,
    tokenB: tokenOne,
    fee: CurrentConfig.tokens.poolFee,
  });

  // 获取当前 pool。在计算出当前 pool 的地址后，我们可以通过这个地址获取 pool 的合约实例。该实例包含了 pool 的所有信息：token0、token1、fee、tickSpacing、liquidity、slot0
  // slot0 是一个元组，包含了 sqrtPriceX96 和 tick
  // sqrtPriceX96 是一个固定点数，表示当前 pool 的价格。它是通过 tick 计算出来的
  // tick 是一个整数，表示当前 pool 的价格范围。它是通过 tickSpacing 计算出来的
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider
  );

  // 获取 pool 的信息
  // token0: tokenA 的地址
  // token1: tokenB 的地址
  // fee: 手续费。0.05%、0.3%、1% 三种。由于我们在配置文件中设置了 poolFee 为 FeeAmount.MEDIUM，所以这里是 0.3%
  // tickSpacing: 价格范围。由于我们在配置文件中没有设置，所以这里是默认值 60
  // liquidity: 流动性。由于我们在配置文件中没有设置，所以这里是默认值 0
  // slot0: 包含了 sqrtPriceX96 和 tick
  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}
