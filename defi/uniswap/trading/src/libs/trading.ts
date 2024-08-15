import {
  Currency,
  CurrencyAmount,
  Percent,
  Token,
  TradeType,
} from "@uniswap/sdk-core";
import {
  Pool,
  Route,
  SwapOptions,
  SwapQuoter,
  SwapRouter,
  Trade,
} from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import JSBI from "jsbi";

import { CurrentConfig } from "../config";
import {
  ERC20_ABI,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
} from "./constants";
import { MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS } from "./constants";
import { getPoolInfo } from "./pool";
import {
  getProvider,
  getWalletAddress,
  sendTransaction,
  TransactionState,
} from "./providers";
import { fromReadableAmount } from "./utils";

export type TokenTrade = Trade<Token, Token, TradeType>;

// 创建一个交易
export async function createTrade(): Promise<TokenTrade> {

  // 获取当前的 pool 信息
  const poolInfo = await getPoolInfo();

  // 创建一个 pool
  const pool = new Pool(
    CurrentConfig.tokens.in,
    CurrentConfig.tokens.out,
    CurrentConfig.tokens.poolFee,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick
  );

  // 创建一个交易路由。交易路由是一个数组，包含了 pool。用于计算交易的价格
  const swapRoute = new Route(
    [pool],
    CurrentConfig.tokens.in,
    CurrentConfig.tokens.out
  );

  // 获取输出的数量
  const amountOut = await getOutputQuote(swapRoute);

  // 创建一个未检查的交易。未检查的交易是指没有检查余额的交易，它和检查交易的区别在于，未检查的交易不会检查余额是否足够
  const uncheckedTrade = Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.in,
      fromReadableAmount(
        CurrentConfig.tokens.amountIn,
        CurrentConfig.tokens.in.decimals
      ).toString()
    ),
    outputAmount: CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.out,
      JSBI.BigInt(amountOut)
    ),
    tradeType: TradeType.EXACT_INPUT, // 交易类型。这里是精确输入，即输入数量是固定的，输出数量是不确定的
  });

  return uncheckedTrade;
}

export async function executeTrade(
  trade: TokenTrade
): Promise<TransactionState> {
  const walletAddress = getWalletAddress();
  const provider = getProvider();

  if (!walletAddress || !provider) {
    throw new Error("Cannot execute a trade without a connected wallet");
  }

  // Give approval to the router to spend the token
  const tokenApproval = await getTokenTransferApproval(CurrentConfig.tokens.in);

  // 如果授权失败，直接返回
  if (tokenApproval !== TransactionState.Sent) {
    return TransactionState.Failed;
  }

  // 构建交易参数
  const options: SwapOptions = {
    slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
    recipient: walletAddress,
  };

  // 获取交易参数
  const methodParameters = SwapRouter.swapCallParameters([trade], options);

  // 发送交易
  const tx = {
    data: methodParameters.calldata,
    to: SWAP_ROUTER_ADDRESS,
    value: methodParameters.value,
    from: walletAddress,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  };

  const res = await sendTransaction(tx);

  return res;
}

// Helper Quoting and Pool Functions
async function getOutputQuote(route: Route<Currency, Currency>) {
  const provider = getProvider();

  if (!provider) {
    throw new Error("Provider required to get pool state");
  }

  // 创建一个交易报价器
  const { calldata } = await SwapQuoter.quoteCallParameters(
    route,
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.in,
      fromReadableAmount(
        CurrentConfig.tokens.amountIn,
        CurrentConfig.tokens.in.decimals
      ).toString()
    ),
    TradeType.EXACT_INPUT,
    {
      useQuoterV2: true, // 使用 QuoterV2
    }
  );

  // 调用合约，获取报价。call 方法不会发送交易，只是查询数据。它和 send 方法的区别在于，call 方法不会消耗 gas
  const quoteCallReturnData = await provider.call({
    to: QUOTER_CONTRACT_ADDRESS,
    data: calldata,
  });

  // 解码返回数据
  return ethers.utils.defaultAbiCoder.decode(["uint256"], quoteCallReturnData);
}

export async function getTokenTransferApproval(
  token: Token
): Promise<TransactionState> {
  const provider = getProvider(); // 用于发送交易的 provider
  const address = getWalletAddress(); // 用于发送交易的地址
  if (!provider || !address) {
    console.log("No Provider Found");
    return TransactionState.Failed;
  }

  try {
    // 创建一个新的合约实例。这个合约实例是一个 ERC20 合约
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    );

    // 调用 approve 方法，授权 SWAP_ROUTER_ADDRESS 花费 指定数量的 token
    const transaction = await tokenContract.populateTransaction.approve(
      SWAP_ROUTER_ADDRESS,
      fromReadableAmount(
        TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
        token.decimals
      ).toString()
    );

    return sendTransaction({
      ...transaction,
      from: address,
    });
  } catch (e) {
    console.error(e);
    return TransactionState.Failed;
  }
}
