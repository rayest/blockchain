const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountFactoryModule", (m) => {
  const af = m.contract("AccountFactory");

  return { af };
});
