const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const ethers = hre.ethers
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")
        const blockNumber = await provider.getBlockNumber()
        console.log("Current block number: ", blockNumber)
    }
)

module.exports = {}
