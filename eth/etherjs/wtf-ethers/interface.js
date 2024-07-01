import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

// 1. provider from alchemy
const ALCHEMY_SEPOLIA_URL = config.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// 2. wallet from private key
const privatekey = config.PRIVATE_KEY;
const wallet = new ethers.Wallet(privatekey, provider);
