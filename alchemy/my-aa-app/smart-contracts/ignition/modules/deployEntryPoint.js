const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EntryPointModule", (m) => {
  const entryPoint = m.contract("EntryPoint");

  return { entryPoint };
});
