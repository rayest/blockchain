const { ethers, run, network } = require("hardhat")
const { net } = require("web3")
async function main() {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }

    // ========================================================================================================= deploy

    const ethers = hre.ethers

    const simpleStorageFactory = await ethers.getContractFactory("Counter")

    console.log("Deploying Counter...")

    const simpleStorage = await simpleStorageFactory.deploy(3)
    const address = await simpleStorage.getAddress()

    await simpleStorage.waitForDeployment()

    console.log("Deployed at:", address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
