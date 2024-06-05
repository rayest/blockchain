async function main() {
    const ethers = hre.ethers
    const electionFactory = await ethers.getContractFactory("Election")
    const electionContract = await electionFactory.deploy()
    const address = await electionContract.getAddress()
    console.log("Election deployed at:", address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
