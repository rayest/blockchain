const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const encrypted = await wallet.encrypt(process.env.PASSWORD);
    console.log("encrypted:", encrypted);

    fs.writeFileSync("./encrypted.json", encrypted);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
