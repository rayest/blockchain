require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();



const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
 
const { REACT_APP_ALCHEMY_API_URL, REACT_APP_PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: REACT_APP_ALCHEMY_API_URL,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};