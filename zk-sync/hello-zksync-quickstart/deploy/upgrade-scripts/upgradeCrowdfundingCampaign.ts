import { getWallet } from "../utils";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  const deployer = new Deployer(hre, wallet);

  // Placeholder for the deployed proxy address
  const proxyAddress = "0x009e4886247AEBEBE2c5E5f6d11181ac33DdD7D4";

  const contractV2Artifact = await deployer.loadArtifact(
    "CrowdfundingCampaignV2"
  );

  // Upgrade the proxy to V2
  const upgradedContract = await hre.zkUpgrades.upgradeProxy(
    deployer.zkWallet,
    proxyAddress,
    contractV2Artifact
  );

  console.log(
    "Successfully upgraded crowdfundingCampaign to crowdfundingCampaignV2"
  );

  upgradedContract.connect(deployer.zkWallet);
  // wait some time before the next call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Initialize V2 with a new campaign duration
  const durationInSeconds = 30 * 24 * 60 * 60; // For example, setting a 30-day duration
  const initTx = await upgradedContract.initializeV2(durationInSeconds);
  const receipt = await initTx.wait();

  console.log(
    `CrowdfundingCampaignV2 initialized. Transaction Hash: ${receipt.hash}`
  );
}
