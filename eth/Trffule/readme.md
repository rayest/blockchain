### Test
```shell
$ mkdir CryptoZombies
$ cd CryptoZombies
$ npm install truffle -g
$ npm install truffle-hdwallet-provider
$ truffle migrate --network rinkeby

$ npm install loom-truffle-provider
```
> ./loom genkey -a public_key -k private_key
local address: 0x42F401139048AB106c9e25DCae0Cf4b1Df985c39
local address base64: QvQBE5BIqxBsniXcrgz0sd+YXDk=
$ cat private_key
/i0Qi8e/E+kVEIJLRPV5HJgn0sQBVi88EQw/Mq4ePFD1JGV1Nm14dA446BsPe3ajte3t/tpj7HaHDL84+Ce4Dg==

```shell 
$ truffle migrate --network loom_testnet

$ truffle migrate --network basechain
```
