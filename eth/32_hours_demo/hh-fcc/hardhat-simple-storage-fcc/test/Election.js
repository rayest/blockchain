const { expect } = require("chai")

describe("Election", function () {
    async function deployElectionFixture() {
        const Election = await ethers.getContractFactory("Election")
        const election = await Election.deploy()

        return { election }
    }

    describe("Deployment", function () {
        it("Should deploy the Election contract", async function () {
            const { election } = await deployElectionFixture()

            expect(election.address).to.not.equal(0)
        })
    })

    describe("addCandidate", function () {
        it("Should add a candidate", async function () {
            const { election } = await deployElectionFixture()

            const count = await election.candidatesCount();
            expect(count).to.equal(0);

            await election.addCandidate("Alice")

            const candidate = await election.candidates(1)
            console.log(candidate)
            
            expect(candidate.id).to.equal(1)
            expect(candidate.name).to.equal("Alice")
            expect(candidate.voteCount).to.equal(0)
        })
    })
})
