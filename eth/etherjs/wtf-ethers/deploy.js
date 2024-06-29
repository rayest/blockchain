import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";


const ALCHEMY_MAINNET_URL = config.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const PRIVATE_KEY = config.PRIVATE_KEY;
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ERC20的人类可读abi
const abiERC20 = [
    "constructor(string memory name_, string memory symbol_)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function mint(uint amount) external",
];
// 填入合约字节码，在remix中，你可以在两个地方找到Bytecode
// 1. 编译面板的Bytecode按钮
// 2. 文件面板artifact文件夹下与合约同名的json文件中
// 里面"bytecode"属性下的"object"字段对应的数据就是Bytecode，挺长的，608060起始
// "object": "608060405260646000553480156100...
const bytecodeERC20 = "xxx";

const facory = new ethers.ContractFactory(abiERC20, bytecodeERC20, "wallet");

console.log("deploying contract..."); // 需要足够的 ETH
const contract = await facory.deploy("MyToken", "RAY");
console.log("contract address: ", contract.address);

// 等待合约部署完成
await contract.waitForDeployment();

// mint
console.log("minting...");
let tx = await contract.mint("1000");
await tx.wait();

// balance 
const balance = await contract.balanceOf(wallet.address);

// transfer
console.log("transfering...");
tx = await contract.transfer("0x...", "100");
await tx.wait();

export const testDeploy = async () => {


}