/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomicfoundation/hardhat-ignition-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "local",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:7545",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
}