import { createPublicClient, createWalletClient, custom, http } from "viem";
import { createClient } from "viem";
import { zkSyncSepoliaTestnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: zkSyncSepoliaTestnet,
  transport: http(),
});

const blockNumber = await publicClient.getBlockNumber();
console.log(blockNumber);
