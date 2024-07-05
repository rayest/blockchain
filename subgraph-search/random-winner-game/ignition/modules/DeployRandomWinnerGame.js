const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const owner = process.env.OWNER_ADDRESS;

module.exports = buildModule("RandomWinnerGameModule", (m) => {
  const randomWinnerGame = m.contract("RandomWinnerGame", [owner]);

  return { randomWinnerGame };
});
