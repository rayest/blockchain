- [Quickstart](#quickstart)
  - [Execute a transaction - Local EVM](#execute-a-transaction---local-evm)
  - [Execute a transaction - zkSync](#execute-a-transaction---zksync)


 

# Quickstart 
1. Run the `index.html` file

## Execute a transaction - Local EVM

If you want to execute a transaction follow this:

Make sure you have the following installed:

1. You'll need to open up a second terminal and run:

```
git clone https://github.com/Cyfrin/foundry-fund-me-f23
cd foundry-fund-me-f23
make build
make anvil
```

Then, in a second terminal
```
make deploy
```

This will deploy a sample contract and start a local hardhat blockchain.

2. Update your `constants.js` with the new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. Connect your [metamask](https://metamask.io/) to your local hardhat blockchain.

> **PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.**
> I usually use a few different browser profiles to separate my metamasks easily.

In the output of the above command, take one of the private key accounts and [import it into your metamask.](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

Additionally, add your localhost with chainid 31337 to your metamask.

1. Refresh the front end, input an amount in the text box, and hit `fund` button after connecting

## Execute a transaction - zkSync

If you want to execute a transaction follow this:

1. Open up the `foundry-fund-me-f23` repo, and run a local zkSync node.

> [!IMPORTANT]  
> Be sure to go to the repo and follow the install/requirements instructions. The zkSync environment has different requirements to deploy/setup/etc.

```
git clone https://github.com/Cyfrin/foundry-fund-me-f23
cd foundry-fund-me-f23
make zkbuild
npx zksync-cli dev start
```

This will setup a docker instance of a local zkSync node. 

Then, run:
```
make deploy-zk
```

This will deploy a sample contract and start a local zkSync node.

1. Update your `constants.js` with the new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it after you run `make deploy-zk`.

2. Connect your [metamask](https://metamask.io/) to your local zkSync blockchain.

> [IMPORTANT] **PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.**
> I usually use a few different browser profiles to separate my Metamasks easily.

Import the `DEFAULT_ZKSYNC_LOCAL_KEY` from the `Makefile` of the `foundry-fund-me-f23` repo and [import it into your metamask.](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

Additionally, add your zkSync node with chainid `260` to your metamask.

3. Refresh the front end, input an amount in the text box, and hit `fund` button after connecting
 