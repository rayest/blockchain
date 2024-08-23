const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("ElectionModule", (m) => {
    const election = m.contract("Election")
    return { election }
})
