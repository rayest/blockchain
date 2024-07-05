# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:


## hardhat.
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js

# 1. deploy 
hh ignition deploy ./ignition/modules/DeployRandomWinnerGame.js

# 2. verify 
hh verify --network sepolia CONTRACT_ADDRESS constructor-arg
```

## subgraph
```shell

graph init \
  --product subgraph-studio \
  --from-contract 0x250529e7F41B9ABA0789C2384f56D9Ad42a6E41E \
  --network sepolia \
  --abi  /Users/lirui/Documents/web3/blockchain/subgraph-search/random-winner-game/abi.json \
  random-winner-game 

```