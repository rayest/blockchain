import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-node";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-chai-matchers";

const config: HardhatUserConfig = {
  zksolc: {
    // version: "1.5.1", // Uses latest available in https://github.com/matter-labs/zksolc-bin
    compilerSource: "binary", // 默认即可
    settings: {
      compilerPath: "/Users/lirui/Documents/tools/zksolc-macosx-arm64-v1.5.1", // 这里一定放之前下载的zksolc-linux-amd64-musl-v1.3.13路径
      optimizer: {
        // 是否使用编译优化，一般都要使用的，因为这可以降低部署的gas
        enabled: true, // optional. True by default
        mode: "3", // optional. 3 by default, z to optimize bytecode size
      },
      isSystem: true,
    },
  },
  defaultNetwork: "inMemoryNode",
  networks: {
    zkSyncSepoliaTestnet: {
      url: "https://sepolia.era.zksync.dev",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://explorer.sepolia.era.zksync.dev/contract_verification",
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
    zkSyncGoerliTestnet: {
      // deprecated network
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
      verifyURL:
        "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
    dockerizedNode: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
    },
    inMemoryNode: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "http://127.0.0.1:8011", // in-memory node doesn't support eth node; removing this line will cause an error
      zksync: true,
    },
    hardhat: {
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
