const { expect } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorage

    beforeEach(async function () {
        const ethers = hre.ethers
        simpleStorage = await ethers.deployContract("SimpleStorage")
    })

    it("Should return the new value once it's changed", async function () {
        expect(await simpleStorage.retrive()).to.equal(0)
        await simpleStorage.store(42)
        expect(await simpleStorage.retrive()).to.equal(42)
    })
})
