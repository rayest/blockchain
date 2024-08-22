
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