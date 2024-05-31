require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")

require("./tasks/block-number")

/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_API_KEY = process.env.INFURA_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

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
}
