require("dotenv").config();
// require("@nomiclabs/hardhat-ethers"); // Ensure this is the correct package
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition-ethers");

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897");
setGlobalDispatcher(proxyAgent);

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

   etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
