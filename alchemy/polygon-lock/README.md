# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js

# 部署到 polygon amoy 测试网络
hh ignition deploy ./ignition/modules/Lock.js --network amoy

# interact with contract
hh run scripts/interface.js
```
