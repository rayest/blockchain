import { ethers } from "ethers";
import {
  getProvider,
  getSigner,
  getWalletAddress,
  sendTransaction,
  TransactionState,
} from "./providers";
import { ERC20_ABI, TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER } from "./constants";
import { Token } from "@uniswap/sdk-core";
import { fromReadableAmount } from "./utils";

export async function getTokenTransferApproval(
  token: Token,
  tokenAddress: string
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
      tokenAddress,
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
