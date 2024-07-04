### subgraph

#### init
  * create a subgraph in https://thegraph.com/studio/?show=Create
  
```shell
npm install -g @graphprotocol/graph-cli

graph init --studio rayest-subgraph 
```

> wait if network connect timeout and then DO NOT retry but do as following:

1. create a local abi json file in which the  Contract address is 0x5A3b2E7f335be432f834b3F1bfEf19B44d1f310C  copied from etherscan.io

2. Ethereum network: mainnet
3. Start block: 12876179
4. Contract name: PudgyPenguins
5. Index contract events as entities (Y/n): y 

#### auth and deploy
> please do as https://thegraph.com/studio/subgraph shows:

```shell
graph auth --studio f3405381a750d841b5a8da7ded900efd

cd rayest-subgraph

graph codegen && graph build

graph deploy --studio rayest-subgraph
```

#### query