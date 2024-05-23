import { Web3 } from 'web3';

const web3 = new Web3('https://eth.llamarpc.com');

const blockNumber = await web3.eth.getBlockNumber();
const chainId = await web3.eth.getChainId();

// For more methods: https://docs.web3js.org/libdocs/Web3Eth

document.querySelector(
    '#app'
).innerHTML = `Block Number is ${blockNumber} <br> Chain Id: ${chainId}`;
