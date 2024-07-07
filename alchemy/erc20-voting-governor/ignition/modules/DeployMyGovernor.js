const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyGovernorModule", (m) => {


  const myGovernor = m.contract("MyGovernor", ["0x10Cb94e85cE380126abc154683cE84fDF88F0A72"]);

  return { myGovernor };
});
