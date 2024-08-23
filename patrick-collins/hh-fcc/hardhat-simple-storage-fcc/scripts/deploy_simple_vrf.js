const { ethers, run, network } = require("hardhat")
const { net } = require("web3")
async function main() {
    

    // ========================================================================================================= deploy

    const ethers = hre.ethers
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")

    const tokenFactory = await ethers.getContractFactory("SimpleVRF")

    console.log("Deploying simple vrf...")

    const token = await tokenFactory.deploy(1)
    const address = await token.getAddress()

    await token.waitForDeployment()

    const deployed = await provider.getCode(address)
    console.log("SimpleVRFFactory deployed:", !!deployed)
    console.log("Deployed at:", address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
