require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")

require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_API_KEY = process.env.INFURA_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

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

        localhost: {
            url: "http://localhost:7545",
            chainId: 1337,
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
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "ETHERSCAN_API_KEY",
    },
    sourcify: {
        // Disabled by default
        // Doesn't need an API key
        enabled: true,
    },

    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        currency: "USD",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
        sepolia: {
            default: 1,
        },
    },
}
