import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { indexer } from "./fixtures/commonMethods";

describe("ERC20 Token Contract", () => {
  it("Should check Stake Token Basic Detail", async () => {
    const { deployer, token, users, big, decimal, mintToken } = await loadFixture(indexer);

    expect(await token.name()).to.be.equal("Staking Token");
    expect(await token.symbol()).to.be.equal("STAKE");
    expect(await token.decimals()).to.be.equal(big("18"));

    expect(await token.owner()).to.equal(deployer.address);

  });

  it("Should check Minting Token", async () => {
    const { deployer, token, users, decimal, mintToken } = await loadFixture(indexer);

    await mintToken(20000);

    expect(await token.totalSupply()).to.be.equal(decimal(200000));

    expect(await token.balanceOf(deployer.address)).to.be.equal(decimal(0));

    for (let i = 0; i < 10; i++) {
      expect(await token.balanceOf(users[i].address)).to.be.equal(
        decimal(20000),
      );
    }
  });

  it("Should check Approve Tokens", async () => {
    const { staking, token, users, decimal, mintToken } = await loadFixture(indexer);

    await mintToken(20000);


    for (let i = 0; i < 10; i++) {
      expect(await token.allowance(users[i].address, staking.address)).to.be.equal(
        decimal(20000),
      );
    }
  });

  it("should check all working transfer amout or not", async () => {
    const { token, users, decimal, mintToken } = await loadFixture(indexer);

    await mintToken(2000);

    await token.connect(users[1]).transfer(users[2].address, decimal(150));

    expect(await token.balanceOf(users[1].address)).to.be.equal(decimal(1850));
    expect(await token.balanceOf(users[2].address)).to.be.equal(decimal(2150));
  });
});
