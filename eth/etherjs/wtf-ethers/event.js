import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";


const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 合约地址
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 交易所地址
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// 构建ABI
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

export const testEvent = async () => {
    // 监听合约事件. once 表示只监听一次, 如果需要持续监听, 使用 on
    contractUSDT.once("Transfer", (from, to, value, event) => {
        console.log("Transfer event: ", from, to, value, event);
    });

    // 查看交易所地址的USDT余额
    const balance = await contractUSDT.balanceOf(accountBinance);
    console.log(`USDT Balance of Binance: ${ethers.formatUnits(balance, 6)}`);

    // 检索指定区块范围内的事件日志
    const block = await provider.getBlockNumber();
    console.log("block: ", block);
    const transferEvents = await contractUSDT.queryFilter("Transfer", block - 10, block);
    console.log("events: ", transferEvents[0]);

    // 过滤
    let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    contractUSDT.on(filterBinanceIn, (res) => {
        console.log('---------监听USDT进入交易所--------');
        console.log(
            `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
        )
    })
}