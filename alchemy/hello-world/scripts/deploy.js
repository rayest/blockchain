async function main() {
    // Deploy the contract
    const contract = await ethers.getContractFactory("HelloWorld");
    
    const helloWorld = await contract.deploy("Hello, World!");
    console.log(`Contract deployed to address: ${helloWorld.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });