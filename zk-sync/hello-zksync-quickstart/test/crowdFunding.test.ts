import "@nomicfoundation/hardhat-chai-matchers";

import { expect } from "chai";
import { ethers } from "ethers";
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from "../deploy/utils";

describe("CrowdfundingCampaign", function () {
  let campaign;
  let owner, address1, address2;

  beforeEach(async function () {
    owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    address1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey);
    address2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey);

    const fundingGoalInWei = ethers.parseEther("2").toString();
    campaign = await deployContract(
      "CrowdfundingCampaign",
      [fundingGoalInWei],
      { wallet: owner, silent: true }
    );
  });

  describe("Contribute", function () {
    it("Should reject contributions of 0", async function () {
      await expect(
        campaign.connect(address1).contribute({ value: ethers.parseEther("0") })
      ).to.be.revertedWith("Contribution must be greater than 0");
    });
  });
});
