import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const addressGame = config.CONTRACT_ADDRESS;
console.log("Contract Address: ", addressGame);

const ALCHEMY_SEPOLIA_URL = config.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const privateKey = config.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey, provider);

const abiWinnerGame = [
  "function startGame(uint8, uint256) external",
  "function joinGame() external",
];

const main = async () => {
  const contractWinnerGame = new ethers.Contract(
    addressGame,
    abiWinnerGame,
    wallet
  );

//   const tx = await contractWinnerGame.startGame(1, 100);
//   await tx.wait();
//   console.log("Game started");
//     console.log("Transaction Hash: ", tx.hash);
    
    // join game
    const txJoin = await contractWinnerGame.joinGame();
    await txJoin.wait();
    console.log("Game joined");
    console.log("Transaction Hash: ", txJoin.hash);
};

main();
