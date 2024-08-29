const { network } = require("hardhat");


async function main() {
  const ccipRouterAddressEthereumSepolia = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  const linkTokenAddressEthereumSepolia = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
  const chainIdEthereumSepolia = `16015286601757825753`;

  //  const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();
  const XNFT = await hre.ethers.getContractFactory("XNFT");
  const xNft = await XNFT.deploy(ccipRouterAddressEthereumSepolia, linkTokenAddressEthereumSepolia, chainIdEthereumSepolia);
  await xNft.deployed();

  console.log(`XNFT deployed on ${network.name} with address ${xNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
