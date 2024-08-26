### Foundry

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

#### Documentation

https://book.getfoundry.sh/

#### Usage

##### Build

Run `forge build`

##### Test

```shell
$ forge test
$ forge test --match-contract EVMMemoryTest --match-test test_return_dynamic_array -vvv
$ forge test --match-contract CounterTest --match-test testFuzz_SetNumber --gas-report
```

##### Format

Run `forge fmt`

##### Gas Snapshots

Run `forge snapshot`

##### Anvil

Run `anvil`

##### Deploy

Run `forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>`

##### Cast
Run `cast <subcommand>`

##### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

##### Debug

- Run `forge debug --debug test/evm/EVMMemory.t.sol --sig test_m_load_default` to debug a test case.

#### More to do

- [ ] Git ignore lib: `git restore --staged  lib`
- [ ] 更复杂的 storage 存储。嵌套 mapping、动态 mapping、mapping 的 vale 是数组等。
- [ ] memory 存储。
- [ ] foundry.toml 配置文件: 用于配置测试环境、部署环境等。

#### Foundry library and remapping

- [ ] `forge install rari-capital/solmate --no-commit`
- [ ] `forge remappings`
- [ ] `forge remove solmate`
- [ ] `npm init` and `npm i @openzeppelin/contracts`
- [ ] `forge fmt`

#### Foundry Test

- [ ] Test Event
- [ ] Test Error
- [ ] Test Revert

* Test with vm
  - [ ] `vm.prank()`
  - [ ] `vm.roll(999)`: set the block number to 999.
  - [ ] `vm.warp(2 days)`: set the block number to 2 days later.
  - [ ] `vm.skip(10)`: increase current time by 10 seconds.
  - [ ] `vm.rewind(10)`: decrease current time by 10 seconds.
  - [ ] `vm.hoax(address(1), 100)`: set sender is address 1 and balance is 100.
  - [ ] `vm.deal(address(1), 100)`: Only set address 1 balance to 100.
  - [ ] `vm.addr()` and `vm.sign()`: Test signature
* Test with fork
  Run `forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/xxxxx --match-contract ForkTest --match-test test_deposit`
  Run `forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/xxxxx --match-contract ForkTest --match-test test_dai_deposit`

* Fuzz Test and Invariant Test
* FFI Test

- [ ] Run`forge test --match-contract FFITest --match-test test_ffi_cat --ffi`

* Differential Test

#### Foundry Deploy Script

- [ ] `forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>`

#### Print

- [ ] `forge inspect xxx.sol storage --pretty`
- [ ] `forge inspect Counter storageLayout`
- [ ] `forge inspect Counter abi --pretty`

#### Cast

- [ ] `cast call --contract 0x1234567890 --method balanceOf --args 0x1234567890`
- [ ] `cast --to-base 10 hex`: 将 16 进制转换为 10 进制。结果是 0xa
- [ ] `cast wallet list`
- [ ] `cast wallet new`
- [ ] `cast sig "foo()"`
