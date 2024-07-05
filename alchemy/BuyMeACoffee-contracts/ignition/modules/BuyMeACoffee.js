const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BuyMeACoffeeModule", (m) => {
  const buyMeACoffee = m.contract("BuyMeACoffee");

  return { buyMeACoffee };
});
