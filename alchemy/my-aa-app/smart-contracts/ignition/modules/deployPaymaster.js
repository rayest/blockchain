const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PaymasterModule", (m) => {
  const paymaster = m.contract("Paymaster");

  return { paymaster };
});
