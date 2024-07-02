// Setup: npm install alchemy-sdk
const { Network, Alchemy, Utils } = require("alchemy-sdk");
require("dotenv").config();

const config = process.env;


// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: config.MAIN_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

async function main() {
//   const latestBlock = await alchemy.core.getBlockNumber();
//     console.log("The latest block number is", latestBlock);
    

//     const gasEstimate = await alchemy.core.estimateGas({
//         to: "vitalik.eth",
//         value: Utils.parseEther("1.0"),
//     });
//     console.log("Gas estimate is", gasEstimate);

    const block = await alchemy.core.getBlock(
      "0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3"
    );
    console.log(block);
}

main();
