### TokenList

> 基于 0x 提供的 API 接口，获取 price 和 quote 等 token 数据

```shell
curl https://api.0x.org/swap/v1/quote?sellToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&buyToken=0x6b175474e89094c44da98b954eedeac495271d0f&sellAmount=10000000000000000&takerAddress=xxxx --header '0x-api-key: xxx'

curl https://api.0x.org/swap/v1/price?sellToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&buyToken=0x6b175474e89094c44da98b954eedeac495271d0f&sellAmount=10000000000000000 --header '0x-api-key: xxx'

# 根据这个接口获取所有的 token list，包含了 symbol、logoURI
# let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
```

### Pinata

1. 使用 IPFS 存储 image URL 地址 以及 NFT metadata。先上传图片或者视频 file，生成 ipfs 地址。然后构造 metadata 元数据，包含 name、description 等，是一个 JSON 格式的数据集合。

### The subghraph

```shell
# 1. 先在 the subgraph 上注册一个 graph

# 2. 本地初始化 subgraph studio
graph init

# 3. 如果无法 fetch 成功远程的 contract address，可以直接将合约的 abi.json 复制到本地，通过本地方式树初始化

# 4. 初始化之后，会在本地生成一个project 目录代码，根据官方的步骤，分别执行 auth、build 和 deploy 命令，然后可以进行测试：

curl https://api.studio.thegraph.com/query/77347/random-winner-game/v0.0.1 \-X POST \
-H "Content-Type: application/json" \
-d '{"query" :"{gameStarteds(first: 5) { id gameId entryFee maxPlayers}}"}'

# 5. 自定义实体。初始化的 project 会默认生成一些基于 Event 的实体。如果需要自定义查询需要先定义新实体 --> build --> 在 xxx.ts 文件中对应的 Event handle 下处理生成或者更新实体 Entity 的逻辑 --> deploy
```

### hardhat

```js
// add when verify to avoid timeout 
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897"); // it's up to the proxy settings
setGlobalDispatcher(proxyAgent);

// add when smart contract is too large
settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
    

    
```

### solc-election

1.  用于选择不同版本的 solidity 编译器

```shell
$ solc-select install 0.8.20
$ solc-select use 0.8.20
```

### Formal Verification

####  halmos

```shell
$ halmos --function check_hellFunc_doesnt_revert_halmos  
```



#### certoraRun

```shell
$ pip3 install certora-cli
```

1. 注册获取 APP_KEY

2. 编写需要测试的规则

   1. 在 /test/spec/xxxx.spec 中定义需要测试的规则说明，这个需要参考 certora 的语法说明

3. 编写需要测试的规则

   1. 在 /test/config/xxx.conf 中配置需要测试的 xxx.sol 合约、以及需要验证 verify 的 xxx.spec 

   ```json
   
   {
       "files": [
           "./src/invariant-break/FormalVerificationCatches.sol"
       ],
       "verify": "FormalVerificationCatches:./test/invariant-break/formal-verification/certora/spec/FVCatches.spec",
       "wait_for_results": "all",
       "rule_sanity": "basic",
       "optimistic_loop": true,
       "msg": "Verification of FormalVerificationCatches"
   }
   ```

4. 运行 

```shell
$ certoraRun ./test/invariant-break/formal-verification/certora/conf/FVCatches.conf
```

