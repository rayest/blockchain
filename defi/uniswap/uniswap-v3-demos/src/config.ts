import { Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";

import { WETH_TOKEN, USDC_TOKEN, DAI_TOKEN } from "./libs/constants";

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
  };
  wallet: {
    address: string;
    privateKey: string;
  };
  tokens: {
    in: Token;
    amountIn: number;
    out: Token;
    poolFee: number;
  };

  // mint tokens
  tokensMint: {
    token0: Token;
    token0Amount: number;
    token1: Token;
    token1Amount: number;
    poolFee: number;
  };
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: "http://localhost:8545",
    mainnet:
      "https://eth-mainnet.g.alchemy.com/v2/ZDkgG0Id88VpIP45VKCQMP_6w_Hk7Ndi",
  },
  wallet: {
    address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },
  tokens: {
    in: WETH_TOKEN,
    amountIn: 1,
    out: USDC_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },

  tokensMint: {
    token0: USDC_TOKEN,
    token0Amount: 1000,
    token1: DAI_TOKEN,
    token1Amount: 1000,
    poolFee: FeeAmount.MEDIUM,
  },
};
