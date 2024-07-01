import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const privateKey = config.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const address = await wallet.getAddress();

// DAI的ABI
const abiDAI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
];

// DAI的合约地址
const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// DAI合约实例
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

export const staticcall = async () => {
    // 调用DAI合约的balanceOf方法
    const balance = await contractDAI.balanceOf(address);
    console.log("DAI balance:", balance.toString());

    // 调用DAI合约的transfer方法: 向vitalik.eth转1个DAI
    const tx = await contractDAI.transfer.staticCall(
        "vitalik.eth",
        ethers.parseEther("1"),
        { from: await provider.resolveName("vitalik.eth") }
    );
    console.log("transfer tx:", tx); // true


    // 调用DAI合约的transfer方法: from 测试地址 address 转1个DAI to : vitalik.eth
    const tx2 = await contractDAI.transfer.staticCall(
        "vitalik.eth",
        ethers.parseEther("1"),
        { from: address }
    );
    console.log("transfer tx:", tx2); // false: not enough balance
};
