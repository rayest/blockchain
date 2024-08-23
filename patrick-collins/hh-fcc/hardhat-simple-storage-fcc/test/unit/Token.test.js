const { deployments } = require("hardhat")
const { assert } = require("chai")

describe("Token", function () {
    let token
    let address = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"

    beforeEach(async function () {
        const ethers = hre.ethers
        token = await ethers.deployContract("Token", ["hello"])
    })

    it("Should 0 balance", async function () {
        const balance = await token.balanceOf(address)
        assert.equal(balance, 0)
    })

    it("Should return hello", async function () {
        const hello = await token.hello("hello")
        assert.equal(hello, "hello")
    })

    it("Should return init constructor params: hello", async function () {
        const addtionParam = await token.addtionParam()
        assert.equal(addtionParam, "hello")
    })

    it("Should return signers", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        console.log(owner.address)
        console.log(otherAccount.address)
    })
})
