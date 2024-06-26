// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "<-- ALCHEMY APP API KEY -->",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// The token address we want to query for metadata
const metadata = await alchemy.core.getTokenMetadata(
    "0xdAC17F958D2ee523a2206206994597C13D831ec7"
);

console.log("TOKEN METADATA");
console.log(metadata);