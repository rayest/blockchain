# Account abstraction multisig tutorial 📖

## Handy Commands 🛠️

Here's a lineup of commands to assist you:

- `yarn install`: Installs the required dependencies.
- `yarn compile`: Compiles the contracts.
- `yarn deploy:factory`: Deploys your contracts smoothly.
- `yarn deploy:multisig`: Executes the `deploy-multisig.ts` script.
- `yarn test`: Runs tests.

### Environment variables 🌳

```
WALLET_PRIVATE_KEY=123cde574ccff....
```

### hardhat.config.ts
* for local testing, set zksolc compile path
* for local testing, start docker container for inMemoryNode and set default network to inMemoryNode
* 

### Steps
```shell
# 1. deploy factory contract
$ hh deploy-zksync --script deploy-factory.ts  --network inMemoryNode

# 2. deploy multisig account using factory contract address
$ hh deploy-zksync --script deploy-multisig.ts  --network inMemoryNode
``` 
