import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const ALCHEMY_MAINNET_URL_WS = config.ALCHEMY_MAINNET_URL_WS;

export const testParseTx = async () => {
  const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_URL_WS);
  const network = await provider.getNetwork();
  console.log(`network chainId: ${network.chainId}`);

  // 解析交易
  console.log("解析交易");

  // 创建 interface 对象
  const iface = new ethers.Interface([
    "function transfer(address, uint) public returns (bool)",
  ]);

  // 获取函数的 selector
  const selector = iface.getFunction("transfer").selector;
  console.log(`selector: ${selector}`);

  let j = 0;
  provider.on("pending", async (txHash) => {
    if (txHash) {
      const tx = await provider.getTransaction(txHash);
      j++;
      if (tx !== null && tx.data.indexOf(selector) !== -1) {
        console.log(
          `[${new Date().toLocaleTimeString()}]监听到第${
            j + 1
          }个pending交易:${txHash}`
        );
        console.log(
          `打印解码交易详情:${JSON.stringify(
            iface.parseTransaction(tx),
            handleBigInt,
            2
          )}`
        );
        console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`);
        console.log(
          `转账金额:${ethers.formatEther(iface.parseTransaction(tx).args[1])}`
        );
        provider.removeListener("pending", this);
      }
    }
  });
};

function handleBigInt(key, value) {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
}
