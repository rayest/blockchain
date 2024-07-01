import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

export const batchWallet = async () => {
    // 生成随机助记词
    const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
    console.log("mnenomic: ", mnemonic);

    // 创建 HD 钱包
    const basePath = "44'/60'/0'/0/";
    const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
    console.log("baseWallet: ", baseWallet);

    // 派生 20 个钱包
    for (let i = 0; i < 20; i++) {
        const wallet = baseWallet.derivePath(i.toString());
        console.log(`wallet ${i}: `, wallet.address);
    }

    // 2. 从助记词恢复钱包
    const recoverWallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log("recoverWallet: ", recoverWallet.address);

    // password
    const password = "password";
    const encryptWalletJson = await recoverWallet.encrypt(password);
    console.log("encryptWallet: ", encryptWalletJson);

    // 从 JSON 恢复钱包
    const decryptWallet = await ethers.Wallet.fromEncryptedJson(encryptWalletJson, password);
    console.log("decryptWallet: ", decryptWallet.address);
}