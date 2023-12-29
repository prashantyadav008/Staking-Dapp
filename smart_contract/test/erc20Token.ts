import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { big, decimal, basicMethod } from "./index";

describe("Staking Token Contract", () => {
  describe("Mint to Address", () => {
    it("Should check Stake Token Basic Detail", async () => {
      const { deployer, token, users } = await loadFixture(basicMethod);

      expect(await token.name()).to.be.equal("Staking Token");
      expect(await token.symbol()).to.be.equal("STAKE");
      expect(await token.decimals()).to.be.equal(big("18"));

      expect(await token.owner()).to.equal(deployer.address);

      expect(await token.totalSupply()).to.be.equal(decimal(2000));
      expect(await token.balanceOf(deployer.address)).to.be.equal(
        decimal(0),
      );

      for (let i = 0; i < 10; i++) {
        expect(await token.balanceOf(users[i].address)).to.be.equal(
          decimal(200),
        );
      }
    });

    it("should check all working transfer amout or not", async () => {
      const { token, users } = await loadFixture(basicMethod);

      await token
        .connect(users[1])
        .transfer(users[2].address, decimal(150));

      expect(await token.balanceOf(users[1].address)).to.be.equal(
        decimal(50),
      );
      expect(await token.balanceOf(users[2].address)).to.be.equal(
        decimal(350),
      );
    });
  });
});
