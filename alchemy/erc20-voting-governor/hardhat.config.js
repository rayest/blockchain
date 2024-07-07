/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomicfoundation/hardhat-ignition-ethers");


const { RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}