const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect } = require("chai");

describe("RandomWinnerGame", function () {
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const RandomWinnerGame = await ethers.getContractFactory(
      "RandomWinnerGame"
    );
    const randomWinnerGame = await RandomWinnerGame.deploy(owner.address);

    return { randomWinnerGame, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { randomWinnerGame, owner } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await randomWinnerGame.s_owner()).to.equal(owner.address);
    });
  });
});