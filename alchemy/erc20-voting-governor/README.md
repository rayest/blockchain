# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js

# 先部署合约 myToken
$ npx hardhat ignition deploy ./ignition/modules/MyToken.js --network sepolia

# 再部署 治理合约 DeployMyGovernor
$ npx hardhat ignition deploy ./ignition/modules/DeployMyGovernor.js --network sepolia

# 再在 tally.xyz 平台上注册治理合约，进行提议和投票
```
