require('dotenv').config();
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const owner = process.env.WALLET_ADDRESS;

module.exports = buildModule("MyNFTModule", (m) => {
  const myToken = m.contract("MyNFT", [owner]);

  return { myToken };
});
