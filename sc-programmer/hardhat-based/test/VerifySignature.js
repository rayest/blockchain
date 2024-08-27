
const { expect } = require("chai");
const { ethers } = require("hardhat"); // 确保导入 ethers


describe("VerifySignature", function () {
  it("Check signature", async function () {
    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners(2);

    const VerifySignature = await ethers.getContractFactory("VerifySignature");
    const verifySignature = await VerifySignature.deploy();

    const signer = accounts[0];
    const to = accounts[1].address;
    const amount = 999;
    const message = "Hello";
    const nonce = 123;

    const hash = await verifySignature.getMessageHash(to, amount, message, nonce);
    const sig = await signer.signMessage(hash);

    expect(await verifySignature.verify(signer.address, to, amount, message, nonce, sig)).to.equal(true);
  });
});