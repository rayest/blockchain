import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const PRIVATE_KEY = config.PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = config.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)


export const contractInteract = async () => {
    // 通过私钥创建钱包
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("wallet: ", wallet);
    
    // 查看钱包余额
    const balance = await provider.getBalance(wallet.address);
    console.log("balance: ", ethers.formatEther(balance));

    // 通过abi和地址创建合约
    const abi = [
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint amount) returns (boolean)"
    ];
    const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
    const contractDAI = new ethers.Contract(addressDAI, abi, wallet);

    // 转账

}