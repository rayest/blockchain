### truffle 
  > 1. truffle 是一个以太坊开发框架，它提供了一套开发、编译、部署、测试和调试智能合约的工具。truffle 是一个基于 node.js 的命令行工具，它可以帮助开发者更加高效地开发智能合约。
  2. ganache 是一个以太坊的模拟器，它可以模拟以太坊的网络环境，开发者可以使用 ganache 来模拟以太坊的网络环境，进行智能合约的开发、测试和调试。
  3. 

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