const { ethers, run, network } = require("hardhat")
const { net } = require("web3")
async function main() {
    const ethers = hre.ethers

    const BasicNFTFactory = await ethers.getContractFactory("BasicNFT")

    console.log("Deploying BasicNFT...")

    const BasicNFT = await BasicNFTFactory.deploy()
    const address = await BasicNFT.getAddress()

    await BasicNFT.waitForDeployment()

    console.log("Deployed at:", address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
