const optimism = require("@eth-optimism/sdk");
const ethers = require("ethers");

// 导入 data.json 文件
const data = require("./data.json");

const privateKey = data.privateKey;

async function main() {
  const l1Provider = new ethers.providers.StaticJsonRpcProvider(
    "https://rpc.ankr.com/eth_sepolia"
  );
  const l2Provider = new ethers.providers.StaticJsonRpcProvider(
    "https://sepolia.optimism.io"
  );

  const l1Wallet = new ethers.Wallet(privateKey, l1Provider);
  const l2Wallet = new ethers.Wallet(privateKey, l2Provider);

  console.log((await l1Wallet.getBalance()).toString());

  const messenger = new optimism.CrossChainMessenger({
    l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
    l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet,
  });

  // from L1 to L2. 向 L2 转账
  tx = await messenger.depositETH(ethers.utils.parseEther("0.006942"));
  await tx.wait();

  await messenger.waitForMessageStatus(tx.hash, optimism.MessageStatus.RELAYED);

  console.log((await l1Wallet.getBalance()).toString());
  console.log((await l2Wallet.getBalance()).toString());

  // from L2 to L1
  const withdrawal = await messenger.withdrawETH(
    ethers.utils.parseEther("0.004269")
  );
  await withdrawal.wait();

  console.log((await l2Wallet.getBalance()).toString());

  await messenger.waitForMessageStatus(
    withdrawal.hash,
    optimism.MessageStatus.READY_TO_PROVE
  );

  await messenger.proveMessage(withdrawal.hash);

  await messenger.waitForMessageStatus(
    withdrawal.hash,
    optimism.MessageStatus.READY_FOR_RELAY
  );

  await messenger.finalizeMessage(withdrawal.hash);

  await messenger.waitForMessageStatus(
    withdrawal.hash,
    optimism.MessageStatus.RELAYED
  );

  console.log((await l1Wallet.getBalance()).toString());
}

main();
