import { CurrencyAmount, Percent, Token } from "@uniswap/sdk-core";
import { CurrentConfig } from "../config";
import {
  getProvider,
  getWalletAddress,
  sendTransaction,
  TransactionState,
} from "./providers";
import { BigNumber, ethers } from "ethers";
import {
  ERC20_ABI,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  NONFUNGIBLE_POSITION_MANAGER_ABI,
  NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
  TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
} from "./constants";
import { fromReadableAmount } from "./utils";
import {
  MintOptions,
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position,
} from "@uniswap/v3-sdk";
import { getPoolInfo } from "./pool";

export interface PositionInfo {
  tickLower: number;
  tickUpper: number;
  liquidity: BigNumber;
  feeGrowthInside0LastX128: BigNumber;
  feeGrowthInside1LastX128: BigNumber;
  tokensOwed0: BigNumber;
  tokensOwed1: BigNumber;
}

export async function mintPosition(): Promise<TransactionState> {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!provider || !address) {
    return TransactionState.Failed;
  }

  // approval
  const tokenInApproval = await getTokenTransferApproval(
    CurrentConfig.tokensMint.token0
  );
  const tokenOutApproval = await getTokenTransferApproval(
    CurrentConfig.tokensMint.token1
  );
  if (
    tokenInApproval !== TransactionState.Sent ||
    tokenOutApproval !== TransactionState.Sent
  ) {
    return TransactionState.Failed;
  }

  // mint
  const positionToMint = await constructPosition(
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokensMint.token0,
      fromReadableAmount(
        CurrentConfig.tokensMint.token0Amount,
        CurrentConfig.tokensMint.token0.decimals
      ).toString()
    ),
    CurrencyAmount.fromRawAmount(
      CurrentConfig.tokensMint.token1,
      fromReadableAmount(
        CurrentConfig.tokensMint.token1Amount,
        CurrentConfig.tokensMint.token1.decimals
      ).toString()
    )
  );

  const mintOptions: MintOptions = {
    recipient: address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    slippageTolerance: new Percent(50, 10_000),
  };

  const { calldata, value } = NonfungiblePositionManager.addCallParameters(
    positionToMint,
    mintOptions
  );

  // build transaction
  const transaction = {
    data: calldata,
    to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    value,
    from: address,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    gasLimit: 3000000,
  };

  return sendTransaction(transaction);
}

export async function constructPosition(
  token0: CurrencyAmount<Token>,
  token1: CurrencyAmount<Token>
): Promise<Position> {
  const poolInfo = await getPoolInfo(
    CurrentConfig.tokensMint.token0,
    CurrentConfig.tokensMint.token1
  );
  const configuredPool = new Pool(
    token0.currency,
    token1.currency,
    poolInfo.fee,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick
  );

  return Position.fromAmounts({
    pool: configuredPool,
    tickLower:
      nearestUsableTick(poolInfo.tick, poolInfo.tickSpacing) -
      poolInfo.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolInfo.tick, poolInfo.tickSpacing) +
      poolInfo.tickSpacing * 2,
    amount0: token0.quotient,
    amount1: token1.quotient,
    useFullPrecision: true,
  });
}

export async function getTokenTransferApproval(
  token: Token
): Promise<TransactionState> {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!provider || !address) {
    return TransactionState.Failed;
  }

  try {
    const ERC20Contract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    );

    const tokenBalance = await ERC20Contract.balanceOf(address);
    console.log("balance before approval", tokenBalance);
    const transaction = await ERC20Contract.populateTransaction.approve(
      NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
      fromReadableAmount(
        TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
        token.decimals
      ).toString()
    );
    return sendTransaction({ ...transaction, from: address });
  } catch (error) {
    console.error("error approving token transfer", error);
    return TransactionState.Failed;
  }
}

export async function getPositionIds(): Promise<number[]> {
  const provider = getProvider();
  const address = getWalletAddress();
    if (!provider || !address) {
      throw new Error("No provider or address");

  }

  const positionContract = new ethers.Contract(
    NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    NONFUNGIBLE_POSITION_MANAGER_ABI,
    provider
  );
    
    const balance: number = await positionContract.balanceOf(address); 

    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await positionContract.tokenOfOwnerByIndex(address, i);
      tokenIds.push(tokenId);
    }
    return tokenIds;
}

export async function getPositionInfo(tokenId: number): Promise<PositionInfo> {
  const provider = getProvider();
  if (!provider) {
    throw new Error("No provider");
  }

  const positionContract = new ethers.Contract(
    NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    NONFUNGIBLE_POSITION_MANAGER_ABI,
    provider
  );

    const position = positionContract.positions(tokenId);
    return {
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      liquidity: position.liquidity,
      feeGrowthInside0LastX128: position.feeGrowthInside0LastX128,
      feeGrowthInside1LastX128: position.feeGrowthInside1LastX128,
      tokensOwed0: position.tokensOwed0,
      tokensOwed1: position.tokensOwed1,
    };
}