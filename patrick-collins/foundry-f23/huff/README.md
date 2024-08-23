### Basis
```shell
forge init --force

huffc --version

huffc src/HorseStore.huff -b

# 编译和生成运行态字节码。不包含合约 creation bytecode
huffc src/HorseStore.huff --bin-runtime

# 安装 huff 语言插件
forge install huff-language/foundry-huff --no-commit

# debug 测试指定文件里的函数
forge test --match-path test/v1/HorseStorageHuff.t.sol --debug testReadValue -vvv
```

### Notes
* HorseStorage 使用了 solidity 和 huff 编写的两种合约代码，其中 solidity 版本的合约代码在 `src/HorseStore.sol` 文件中，huff 版本的合约代码在 `src/HorseStore.huff` 文件中。实现的功能是存储和读取一个 uint256 类型的值。在测试中，我们会测试两种合约代码的功能是否一致。

### 逐行分析字节码 evm 
> please refer to breakdowns/solc-breakdowns.c++


### yul
 ```shell
 solc --strict-assembly --optimize --optimize-runs 20000 ./yul/HorseStoreYul.yul --bin | grep 60
 ```

 ### foundry
 ```shell
 # DEPLOY TO SEPOLIA
 forge script --chain sepolia script/AssemblyVariableScript.s.sol:AssemblyVariableScript --rpc-url $SEPOLIA_RPC_URL --broadcast


# deploy to local
 forge script script/AssemblyVariableScript.s.sol:AssemblyVariableScript --fork-url http://localhost:8545 --broadcast


 # test matched contract: only test AssemblyVariableTest contract
 forge test --match-contract AssemblyVariableTest

# test matched function: only test 
forge test --match-contract AssemblyVariableTest --match-path 
 ```