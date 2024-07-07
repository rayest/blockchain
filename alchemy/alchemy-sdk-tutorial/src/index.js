// 导入 Alchemy SDK
import { Alchemy, Network } from 'alchemy-sdk';



const blockNumberEl = document.getElementById('s-blockNumber');
const blockHash = document.getElementById('s-blockHash');

// 配置 Alchemy
const settings = {
    apiKey: 'l-7vpaOuK_-GKtHE7w1J7PNbRbgwWKgF', // 从环境变量中获取 Alchemy API key
    network: Network.ETH_SEPOLIA, // 可以根据需要更改网络

};

// 创建 Alchemy 实例
const alchemy = new Alchemy(settings);

// 示例代码：获取最新区块号
alchemy.core.getBlockNumber().then(blockNumber => {
    console.log('最新区块号:', blockNumber);
    blockNumberEl.textContent = blockNumber;
}).catch(error => {
    console.error('获取最新区块号时出错:', error);
});

