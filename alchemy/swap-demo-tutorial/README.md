
This app [aggregates liquidity across the greater DEX ecosystem using 0x](https://docs.0x.org/introduction/introduction-to-0x#the-0x-ecosystem) to surfaces the best price to the user and allow them to easily settle their trades!

## Follow Along to Learn

* 💦 What is liquidity aggregation?
* 🪟 Query + Display an ERC20 token list
* ♻️ Use @0xProject API's /swap endpoint
* 🧱 Build a Swap Dapp with Metamask and Web3.js
* ETH is not ERC20, so we'll need to wrap it in WETH

## Video and Written Tutorial
 * Part 4. Fetch and Display Token List from CoinGecko API
 * Part 5. Display Selected Token Image and Symbol in Swap Box
 * Part 6. Get Price
 * Part 7. Get Quote
 * Part 8. Set a Token Allowance
 * Part 9. Perform the Swap

## Further Examples

To find more demo apps, check out the official [0x examples repo](https://github.com/0xProject/0x-examples).

Try out - 

- [Swap API Demo App (Next.js)](https://github.com/0xProject/0x-nextjs-demo-app/tree/main)
- [Tx Relay API Demo App (Next.js App Router)](https://github.com/0xProject/0x-examples/tree/main/tx-relay-next-app)


## to install and start the app

```bash
# 1. before bundle index.js, install browserify and qs
npm install -g browserify  
npm i qs   

# 2. this is used to package the app with browserify to run in the browser
browserify index.js --standalone bundle -o bundle.js

```