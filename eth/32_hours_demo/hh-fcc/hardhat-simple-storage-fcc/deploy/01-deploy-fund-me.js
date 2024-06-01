// function deployFunction() {
//     console.log('Deploying FundMe contract...');
// }

const { network } = require("hardhat")

// module.exports.default = deployFunction;

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = await network.config.getChainId
    await deploy("Token", {
        from: deployer,
        args: [],
        log: true,
    })
}
