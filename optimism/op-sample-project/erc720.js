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

  // uses existing ERC-20 tokens that have been deployed on Sepolia and OP Sepolia
  const l1Token = "0x5589BB8228C07c4e15558875fAf2B859f678d129";
  const l2Token = "0xD08a2917653d4E460893203471f0000826fb4034";

  const erc20ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      inputs: [],
      name: "faucet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const l1ERC20 = new ethers.Contract(l1Token, erc20ABI, l1Wallet);

  // try to get some tokens from the faucet to L1
  tx = await l1ERC20.faucet();
  await tx.wait();

  console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString());

  // deposit one token from L1 to L2
  const oneToken = 1000000000000000000n;
  const messenger = new optimism.CrossChainMessenger({
    l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
    l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet,
  });

  tx = await messenger.approveERC20(l1Token, l2Token, oneToken);
  await tx.wait();

  tx = await messenger.depositERC20(l1Token, l2Token, oneToken);
  await tx.wait();

  await messenger.waitForMessageStatus(tx.hash, optimism.MessageStatus.RELAYED);

  // check the balance on L1
  console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString());

  // check the balance on L2
  const l2ERC20 = new ethers.Contract(l2Token, erc20ABI, l2Wallet);
  console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString());

    
  // withdraw tokens
  const withdrawal = await messenger.withdrawERC20(l1Token, l2Token, oneToken);
  await withdrawal.wait();

  console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString());

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
}

main();
