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

    const tokenFactory = await ethers.getContractFactory("Token")

    console.log("Deploying Token...")

    const token = await tokenFactory.deploy()
    const address = await token.getAddress()

    await token.waitForDeployment()

    const deployed = await provider.getCode(address)
    console.log("TokenFactory deployed:", !!deployed)
    console.log("Deployed at:", address)

    // ========================================================================================================= operation
    const name = await token.name()
    console.log("Token name:", name)

    const symbol = await token.symbol()
    console.log("Token symbol:", symbol)

    const balance = await token.balanceOf(accounts[0].address)
    console.log("Token balance:", balance)

    const rayest = await token.hello("rayest")
    console.log("Hello:", rayest)

    // ========================================================================================================= verify
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
