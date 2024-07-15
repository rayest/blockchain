import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getWallet } from "./utils";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { ethers } from "ethers";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  const deployer = new Deployer(hre, wallet);
  const contractArtifact = await deployer.loadArtifact("CrowdfundingCampaignV1");
  const fundingGoalInWei = ethers.parseEther("0.2").toString();

  // Deploy the contract using transparent proxy
  const crowdFunding = await hre.zkUpgrades.deployProxy(
    getWallet(),
    contractArtifact,
    [fundingGoalInWei],
    { initializer: "initialize" }
  );

  await crowdFunding.waitForDeployment();
}
