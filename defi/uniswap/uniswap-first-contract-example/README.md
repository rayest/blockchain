# Basic Uniswap Integration Environment
Learn to build your first on chain integration here: https://uniswap.org/blog/your-first-uniswap-integration. 

### Setup
1. ensure node version is 18 or 16 or 14, no more than 18
2. `npm install`
3. update hardhat `npm install --save-dev hardhat@latest`
4. folk mainnet `npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}`
5. code swap function in contract
6. code test for swap function
7. run test in localhost `npx hardhat test --network localhost`