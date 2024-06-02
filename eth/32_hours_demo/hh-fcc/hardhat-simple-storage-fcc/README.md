### hardhat

```shell
$ yarn init
$ yarn add --dev hardhat
$ yarn hardhat
$ yarn hardhat compile

$ yarn add --dev prettier-plugin-solidity


$ yarn hardhat run scripts/deploy.js

# deploy to sepolia network
$ yarn hardhat run scripts/deploy.js --network sepolia

# ether scan plugin: etherscan
$ yarn add --dev @nomiclabs/hardhat-etherscan

# custom tasks
$  yarn hardhat block-number --network sepolia

# deploy to localhost
$ yarn hardhat run scripts/deploy.js --network localhost

# test
$ yarn hardhat test

# gas reporter
$ yarn add hardhat-gas-reporter --dev

# test coverage
$ yarn add --dev solidity-coverage
$ yarn hardhat coverage

# hardhat-deploy
$ yarn add --dev hardhat-deploy

# http-server
$ yarn add --dev http-server
$ yarn http-server
```
