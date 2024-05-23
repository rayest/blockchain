### truffle 
  > 1. truffle 是一个以太坊开发框架，它提供了一套开发、编译、部署、测试和调试智能合约的工具。truffle 是一个基于 node.js 的命令行工具，它可以帮助开发者更加高效地开发智能合约。
  2. ganache 是一个以太坊的模拟器，它可以模拟以太坊的网络环境，开发者可以使用 ganache 来模拟以太坊的网络环境，进行智能合约的开发、测试和调试。

* 使用 truffle 实现简单的合约并部署到本地网络

  ```shell
$ npm install -g truffle 
$ npm install ganache --global
$ mkdir eth-hello-world

# 初始化项目
$ truffle init

# code HelloWorld.sol --> update development network in truffle-config.js --> start ganache
$ ganache

# 编译合约
$ truffle compile

# 部署合约: 部署到本地
$ truffle migrate

# 启动控制台
$ truffle console

# 测试合约
$ truffle test

# 打包合约
$ truffle build

# 部署合约到测试网络
$ truffle migrate --network ropsten

# 部署合约到主网
$ truffle migrate --network mainnet

# 部署合约到私有网络
$ truffle migrate --network private

# 部署合约到开发网络
$ truffle migrate --network development

  ```

* 使用 infura 

```shell
$ cd truffle 
$ mkdir test-infura
$ truffle init
$ npm install --save @truffle/hdwallet-provider
# 1. 先开启本地的 ganache 网络
$ truffle console
# 2. 在 ganache 网络中通过 console 中创建钱包： const HDWalletProvider = require('@truffle/hdwallet-provider');
# 3. 通过在线工具生成助记词 wet tank palace fox focus destroy key zebra flip unit banner hill
# 4. const mnemonic = 'wet tank palace fox focus destroy key zebra flip unit banner hill';
#    const wallet = new HDWalletProvider(mnemonic, "http://localhost:8545");
#。  wallet
```

![image-20240523084950115](/Users/lirui/Library/Application Support/typora-user-images/image-20240523084950115.png)

```shell
$ touch .env
$ npm install --save dotenv
# 在 .env 中配置 infura 的 API key 和助记词
# 配置 truffle-config.js 网络: repsten。如果不可用，需要替换为其他的，如 sepolia 或者 Goerli
# 初始化 migration
# 编写合约代码和对应的 migration
$ truffle migrate --network ropsten
```

