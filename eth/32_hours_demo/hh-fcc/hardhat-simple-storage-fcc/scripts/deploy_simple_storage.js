const { ethers, run, network } = require("hardhat")
const { net } = require("web3")
async function main() {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }

    // ========================================================================================================= deploy

    const ethers = hre.ethers
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")


    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying SimpleStorage...")

    const simpleStorage = await simpleStorageFactory.deploy()
    const address = await simpleStorage.getAddress()

    await simpleStorage.waitForDeployment()

    const deployed = await provider.getCode(address)
    console.log("SimpleStorageFactory deployed:", !!deployed)
    console.log("Deployed at:", address)

    // ========================================================================================================= operation
    const favoriteNumber = await simpleStorage.retrive()
    console.log("Favorite number:", favoriteNumber)

    await simpleStorage.store(13)
    console.log("Stored 13")

    const newFavoriteNumber = await simpleStorage.retrive()
    console.log("New favorite number:", newFavoriteNumber)
    


    // ========================================================================================================= verify
    async function verifyContract(contractAddress) {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: [],
        })
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
