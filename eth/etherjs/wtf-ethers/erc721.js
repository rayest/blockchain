import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";

const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;

// 1. provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 2. new contract instance of BAYC
const addressBAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const abiBAYC = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function supportsInterface(bytes4) public view returns(bool)",
];

const contractBAYC = new ethers.Contract(addressBAYC, abiBAYC, provider);

// 3. interact with contract
export const testErc721 = async () => {
  // 3.1 call
  const name = await contractBAYC.name();
  console.log("name:", name);

  const symbol = await contractBAYC.symbol();
  console.log("symbol:", symbol);

  const isERC721 = await contractBAYC.supportsInterface("0x80ac58cd");
  console.log("isERC721:", isERC721);
};