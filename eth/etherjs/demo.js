import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');

document.getElementById('getInfo').addEventListener('click', async () => {
    const blockNumber = await provider.getBlockNumber();
    const accounts = await provider.listAccounts();
    const balance = await provider.getBalance(accounts[0]);

    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `
        <p>Current block number: ${blockNumber}</p>
        <p>Accounts: ${accounts.join(', ')}</p>
        <p>Balance of first account: ${ethers.utils.formatEther(balance)} ETH</p>
    `;
});