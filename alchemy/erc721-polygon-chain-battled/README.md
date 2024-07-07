# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js



# deploy to amoy network 
hh ignition deploy ./ignition/modules/ChainBattles.js

hh verify --network amoy 0x910EbE3FA1cc88430e53c01b9737347E1dd4ffa8
```


* When deployed to the Polygon amoy network. We can call the train function to train a specified token id at etherscan and inspect at openSea.
* All NFTs can be found on openSea at https://testnets.opensea.io/collection/chainbattles