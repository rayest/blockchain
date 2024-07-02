import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const ALCHEMY_MAINNET_URL_WS = config.ALCHEMY_MAINNET_URL_WS;

const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_URL_WS);

// 1. 创建provider和wallet，监听事件时候推荐用wss连接而不是http
// 2. 限制访问rpc速率，不然调用频率会超出限制，报错。
function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

export const testMemPool = async () => {
  // 4. 监听pending交易，并获取交易详情
  console.log("监听pending交易, 获取 txHash, 并输出交易详情。");
  let j = 0;
  provider.on(
    "pending",
    throttle(async (txHash) => {
      if (txHash && j <= 100) {
        // 获取tx详情
        let tx = await provider.getTransaction(txHash);
        console.log(
          `\n[${new Date().toLocaleTimeString()}] 监听 Pending 交易 ${j}: ${txHash} \r`
        );
        console.log(tx);
        j++;
      }
    }, 1000)
  );
};
