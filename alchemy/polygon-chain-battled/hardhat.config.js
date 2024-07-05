require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897");
setGlobalDispatcher(proxyAgent);

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "amoy",
  networks: {
    amoy: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
