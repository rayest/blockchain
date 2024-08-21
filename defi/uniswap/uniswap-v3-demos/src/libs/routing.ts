import {
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  V3_SWAP_ROUTER_ADDRESS,
} from "./constants";
import { CurrencyAmount, Percent, TradeType } from "@uniswap/sdk-core";
import {
  AlphaRouter,
  ChainId,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from "@uniswap/smart-order-router";
import {
  getMainnetProvider,
  getProvider,
  getWalletAddress,
  sendTransaction,
  TransactionState,
} from "./providers";
import { CurrentConfig } from "../config";
import { fromReadableAmount } from "./utils";
import { getTokenTransferApproval } from "./tokenApproval";

export async function generateRoute(): Promise<SwapRoute | null> {
  const router = new AlphaRouter({
    chainId: ChainId.MAINNET,
    provider: getMainnetProvider(),
  });

  const options: SwapOptionsSwapRouter02 = {
    recipient: CurrentConfig.wallet.address,
    slippageTolerance: new Percent(50, 10000),
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    type: SwapType.SWAP_ROUTER_02,
  };

  const route = await router.route(
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokens.in,
      fromReadableAmount(
        CurrentConfig.tokens.amountIn,
        CurrentConfig.tokens.in.decimals
      ).toString()
    ),
    CurrentConfig.tokens.out,
    TradeType.EXACT_INPUT,
    options
  );

  return route;
}

export async function executeRoute(
  route: SwapRoute
): Promise<TransactionState> {
  const walletAddress = getWalletAddress();
  const provider = getProvider();
  if (!walletAddress || !provider) {
    throw new Error("Wallet address or provider not found");
  }

  const tokenApproval = await getTokenTransferApproval(
    CurrentConfig.tokens.in,
    V3_SWAP_ROUTER_ADDRESS
  );
  if (tokenApproval !== TransactionState.Sent) {
    return TransactionState.Failed;
  }

  const res = await sendTransaction({
    data: route.methodParameters?.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: route.methodParameters?.value,
    from: walletAddress,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  });

  console.log("executeRoute", res);

  return res;
}
