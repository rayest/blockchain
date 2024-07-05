## Getting Started

`npm install` to install dependencies

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


* Some changes need to make:
1. Update the contractAddress in pages/index.js
2. Update the name strings to be your own name in pages/index.js
3. Ensure that the contract ABI matches your contract in utils/BuyMeACoffee.json

* Some features to add:
1. Allow your smart contract to update the withdrawal address.
2. Allow your smart contract to buyLargeCoffee for 0.003 ETH, and create a button on the frontend website that shows a "Buy Large Coffee for 0.003ETH" button.