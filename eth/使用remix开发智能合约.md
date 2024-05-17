## 打开remix

> http://remix.ethereum.org

```shell
# 打开本地的geth 并 
$ geth --datadir=/Users/lirui/Documents/dn/codes/bc/fabric/blockchain/eth/geth-data \
--networkid 89120348581 \
--http \
--http.corsdomain "*" \
--http.api "eth,admin,web3,net,debug"
# 从Geth v1.9.0开始，-rpc标志已被移除，取而代之的是更细粒度的控制选项。如果你想在较新版本的Geth中启用HTTP-RPC服务，应该使用--http标志。同时，如果需要允许CORS和指定RPC API，你应该分别使用--http.corsdomain和--http.api选项。
```

