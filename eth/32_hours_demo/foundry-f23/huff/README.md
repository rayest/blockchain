```shell
forge init --force

huffc --version

huffc src/HorseStore.huff -b

huffc src/HorseStore.huff --bin-runtime

forge install huff-language/foundry-huff --no-commit

forge test --match-path test/v1/HorseStorageHuff.t.sol --debug testReadNumber -vvv
```