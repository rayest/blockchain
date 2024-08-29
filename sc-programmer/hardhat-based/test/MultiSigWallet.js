const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");


describe("MultiSigWallet", function () {
  async function deployOneYearLockFixture() {
    const [ownerOne, ownerTwo, ownerThree] = await ethers.getSigners();
    const owners = [
      ownerOne.address,
      ownerTwo.address,
      ownerThree.address,
    ];

    const numConfirmationsRequired = 2;
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.deploy(owners, numConfirmationsRequired);

    return multiSigWallet;
  }

  describe("Deployment", function () {
    it("should set correct owners and confirmation number", async function () {
      const multiSigWallet = await loadFixture(deployOneYearLockFixture);

      const owners = await multiSigWallet.getOwners();
      expect(owners.length).to.equal(3);

      const numConfirmationsRequired = await multiSigWallet.numConfirmationsRequired();
      expect(numConfirmationsRequired).to.equal(2);
    });
  });
});