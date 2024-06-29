import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";


const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)


export const testProvider = async () => {

    // 查看当前区块高度
    const blockNumber = await provider.getBlockNumber();
    console.log("blockNumber", blockNumber);

    // 查看指定 ENS 地址下的 ETH 余额
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);

    // 查看指定地址下的交易次数
    const txs = await provider.getTransactionCount(`vitalik.eth`);
    console.log("txs", txs);

    // 查看当前建议的 gas 设置
    const feeData = await provider.getFeeData();
    console.log("feeData: ", feeData);
}