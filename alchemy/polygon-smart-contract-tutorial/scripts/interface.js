const hre = require("hardhat");
require("dotenv").config();
config = process.env;

const alchemyKey = config.API_URL;
const provider = new hre.ethers.JsonRpcProvider(alchemyKey);
const wallet = new hre.ethers.Wallet(config.PRIVATE_KEY, provider);

const contractABI = require("../artifacts/contracts/Lock.sol/Lock.json");
const contractAddress = config.CONTRACT_ADDRESS;

const lockContract = new hre.ethers.Contract(
  contractAddress,
  contractABI.abi,
  wallet
);

const main = async () => {
  const owner = await lockContract.owner();
  console.log("owner: ", owner);
};

main();
