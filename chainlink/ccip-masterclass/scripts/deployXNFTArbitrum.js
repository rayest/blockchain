// deployXNFTArbitrum.ts

const { network } = require("hardhat");

async function main() {
    const ccipRouterAddressArbitrumSepolia = `0x2a9c5afb0d0e4bab2bcdae109ec4b0c4be15a165`;
    const linkTokenAddressArbitrumSepolia = `0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`;
    const chainIdArbitrumSepolia = `3478487238524512106`;

    const XNFT = await hre.ethers.getContractFactory("XNFT");
    const xNft = await XNFT.deploy(ccipRouterAddressArbitrumSepolia, linkTokenAddressArbitrumSepolia, chainIdArbitrumSepolia);
    await xNft.deployed();

    console.log(`XNFT deployed on ${network.name} with address ${xNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});