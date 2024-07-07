# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

npx hardhat ignition deploy ./ignition/modules/Lock.js

# use hardhat ignition to verify the contract
# npx hardhat ignition verify sepolia-deployment. (you can find it in the path : ignition/deployments/deployment-id)
hh ignition verify chain-11155111
```
