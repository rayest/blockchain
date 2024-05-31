const ethers = require("hardhat")
async function main() {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }

    // =========================================================================================================

    const ethers = hre.ethers
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")

    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying SimpleStorage...")

    const simpleStorage = await SimpleStorageFactory.deploy()
    const address = await simpleStorage.getAddress()

    await simpleStorage.waitForDeployment()

    const deployed = await provider.getCode(address)
    console.log("Deployed at:", address)

    console.log("SimpleStorage deployed:", !!deployed)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
