### Default Demo
1. Run `npx env-enc set-pw` to set the password for the environment variables
3. Run `npx env-enc set` to set Sepolia RPC URL and Etherscan API Key
4. Run `npx env-enc view` to view the environment variables
5. Run `npx hardhat functions-simulate-script` to simulate the script
6. Run ` npx hardhat functions-deploy-consumer --network ethereumSepolia --verify true` to deploy the consumer contract to the network
7. Add the deployed consumer contract address `0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe` to the subscription list in the chainlink function
8. Run `npx hardhat functions-sub-create --network ethereumSepolia --amount 2 --contract 0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe` to create sub and fund the deployed consumer contract with LINK tokens
9. Run `npx hardhat functions-sub-fund --network ethereumSepolia --amount 2 --contract 0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe --subid 3402` to fund the existing subscription
10. Run `npx hardhat functions-request --network ethereumSepolia --contract 0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe --subid 3402`
11. Run `npx hardhat functions-read --contract 0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe --network ethereumSepolia`

### 高德天气 Demo
1. Get 高德天气 API Key And Test in weather-api-example.js
2. Code `weather-function.js`  to request weather data from 高德天气 API
3. Code `Functions-request-config.js` to add `source`、`secrets` and `args` config for the function
4. Set API Key in the environment variables by running `npx env-enc set`
5. Run `npx hardhat functions-simulate-script` to simulate the script
6. If contract has not been deployed, Then Run `npx hardhat functions-deploy-consumer --network ethereumSepolia --verify true` to deploy the consumer contract to the network
7. Run `npx hardhat functions-request --network ethereumSepolia --contract 0xF57ef2E6fCf4D05593Bf752AE2d3598E65DB09fe --subid 3402 --simulate true`

### Todo
- [ ] 将每一种业务请求的脚本隔离，各自使用独立的配置文件
- [ ] 解决 `hardhat functions-request` 时， sender not in the allowlist 的问题
- [ ] 使用其他链的测试网络。如 Polygon、BSC、Avalanche等