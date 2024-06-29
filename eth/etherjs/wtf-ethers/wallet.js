import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";


const ALCHEMY_SEPOLIA_URL = config.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)


export const wallet = async () => {
    // 1. 生成一个新的钱包
    const wallet = ethers.Wallet.createRandom();
    console.log("wallet: ", wallet);

    const mnemonic = wallet.mnemonic
    console.log("mnemonic: ", mnemonic);

    // 2. 通过助记词恢复钱包
    const recoverWallet = ethers.Wallet.fromPhrase(mnemonic.phrase);
    console.log("recoverWallet: ", recoverWallet);

    // connect a wallet to the provider
    const connectedWallet = wallet.connect(provider);
    console.log("connectedWallet: ", connectedWallet);

    // 3. 或者通过私钥创建钱包
    const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
    const walletFromPrivateKey = new ethers.Wallet(privateKey, provider);
    console.log("walletFromPrivateKey: ", walletFromPrivateKey);

    // get wallet address
    console.log("wallet address: ", wallet.address);
 
    // get private key
    console.log("wallet private key: ", wallet.privateKey);

    // get tx count
    const txCount = await provider.getTransactionCount(wallet);
    console.log("txCount: ", txCount);
}