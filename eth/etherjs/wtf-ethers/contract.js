import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";


const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 第2种输入abi的方式：输入程序需要用到的函数，逗号分隔，ethers会自动帮你转换成相应的abi
// 人类可读abi，以ERC20合约为例
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

export const testContract = async () => {

    const daiName = await contractDAI.name();
    console.log("DAI Name: ", daiName);

    const daiSymbol = await contractDAI.symbol();
    console.log("DAI Symbol: ", daiSymbol);

    const daiTotalSupply = await contractDAI.totalSupply();
    console.log(`DAI Total Supply: ${ethers.formatEther(daiTotalSupply)}`);
    
    const daiBalance = await contractDAI.balanceOf(`vitalik.eth`);
    console.log(`DAI Balance of vitalik: ${ethers.formatEther(daiBalance)}`);
}