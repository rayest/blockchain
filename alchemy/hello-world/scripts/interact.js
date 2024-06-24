const { ethers } = require("ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorld = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// interact with the contract
async function main() {
    const message = await helloWorld.message();
    console.log("The init message is: ", message);

    console.log("Updating message...");
    const tx = await helloWorld.updateMessage("Hello, New World!");
    await tx.wait(); // wait for the transaction to be mined

    const newMessage = await helloWorld.message();
    console.log("The new message is: ", newMessage);
}

main();