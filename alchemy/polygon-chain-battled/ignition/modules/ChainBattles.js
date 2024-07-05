const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChainBattlesModule", (m) => {
  const chainBattles = m.contract("ChainBattles");

  return { chainBattles };
});
