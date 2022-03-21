// test/BadgeToken-test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BadgeToken contract", function () {
    let BadgeToken;
    let token721;
    let _name = 'BadteToken';
    let _symbol = 'Badge';
    let account1, otheraccounts;

    beforeEach(async function () {
        BadgeToken = await ethers.getContractFactory("BadgeToken");
        [owner, account1, ...otheraccounts] = await ethers.getSigners();

        token721 = await BadgeToken.deploy(_name, _symbol);
    });

    describe("Deployment", function () {

        it("Should has the correct namd and symbol ", async function () {
            expect(await token721.name()).to.equal(_name);
            expect(await token721.symbol()).to.equal(_symbol);
        });

        it("Should mint a token with token ID 1 & 2 to account1", async function () {
            const address1 = account1.address;
            await token721.mintTo(address1);
            expect(await token721.ownerOf(1)).to.equal(address1);

            await token721.mintTo(address1);
            expect(await token721.ownerOf(2)).to.equal(address1);

            expect(await token721.balanceOf(address1)).to.equal(2);
        });
    });
});