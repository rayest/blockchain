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

# 1. create subgraph
graph init \
  --product subgraph-studio \
  --from-contract 0x250529e7F41B9ABA0789C2384f56D9Ad42a6E41E \
  --network sepolia \
  --abi  /Users/lirui/Documents/web3/blockchain/subgraph-search/random-winner-game/abi.json \
  random-winner-game 

# 2. auth
graph auth --studio auth-key 


# 3. codegen 可以根据业务需要修改实体，然后重新生成代码。生成的代码在 ../generated/schema 
graph codegen

# 3.1 生成代码后，在 subgraph 的 src 目录下的 random-winner-game/src/random-winner-game.ts 文件中添加实体的处理逻辑

# 4. build
graph build

# 5. deploy
graph deploy --studio random-winner-game

# 6. test query
curl https://api.studio.thegraph.com/query/77347/random-winner-game/v0.0.1 \-X POST \
-H "Content-Type: application/json" \
-d '{"query" :"{gameEndeds(first: 5) { id gameId winner requestId}}"}'
```

## frontend 
```shell
# here front end is a simple js file
# 通过 ethers.js 连接到以太坊网络，然后调用合约的方法，触发事件，再通过 subgraph 查询事件的数据
```