import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
import { config } from "./config.js";
import { testProvider } from "./provider.js";
import { testContract } from "./contract.js";
import { wallet } from "./wallet.js";
import { contractInteract } from "./contract-interact.js";
// import { testDeploy } from "./deploy.js";
import { testEvent } from "./event.js";


const ALCHEMY_MAINNET_URL = config.ALCHEMY_MAINNET_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)

 
const main = async () => {
    // testProvider();

    // testContract();

    // wallet();

    // contractInteract();

    // testDeploy();

    testEvent();
}

main();