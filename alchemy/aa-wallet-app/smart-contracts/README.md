# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

# 0. start a local network with hardhat
anvil 


# 1. deploy entry point
hh ignition deploy ./ignition/modules/deployEntryPoint.js

# 2. deploy accountFactory 
hh ignition deploy ./ignition/modules/deployAccountFactory.js

# 3. run test.js
hh run test/test.js

# 4. run execute.js
hh run scripts/execute.js  

# 5. run test.js to see the value change of count 

# 6. deploy paymaster
hh ignition deploy ./ignition/modules/deployPaymaster.js
```
