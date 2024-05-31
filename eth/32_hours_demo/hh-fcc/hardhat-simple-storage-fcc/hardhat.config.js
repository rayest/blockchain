require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_API_KEY = process.env.INFURA_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY

module.exports = {
    solidity: "0.8.24",

    // defaultNetwork: "hardhat",
    networks: {
        //     ropsten: {
        //         url: "https://ropsten.infura.io/v3/your-infura-api-key",
        //         accounts: {
        //             mnemonic: "your mnemonic here",
        //         },
        //     },

        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY],
        },
    },

    //     rinkeby: {
    //         url: "https://rinkeby.infura.io/v3/your-infura-api-key",
    //         accounts: {
    //             apiKey: PRIVATE_KEY,
    //         },
    //         chainId: 4,
    //     },
    // },
}
