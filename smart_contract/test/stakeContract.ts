import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { big, decimal, basicMethod } from "./index";

describe("Staking Token Contract", () => {
  describe("Mint to Address", () => {
    it("Should check Stake Token Basic Detail", async () => {
      const { deployer, stakingToken, users } = await loadFixture(basicMethod);

      expect(await stakingToken.name()).to.be.equal("Staking Token");
      expect(await stakingToken.symbol()).to.be.equal("Stake Token");
      expect(await stakingToken.decimals()).to.be.equal(big("18"));

      expect(await stakingToken.owner()).to.equal(deployer.address);

      expect(await stakingToken.totalSupply()).to.be.equal(decimal(2000));
      expect(await stakingToken.balanceOf(deployer.address)).to.be.equal(
        decimal(0),
      );

      for (let i = 0; i < 10; i++) {
        expect(await stakingToken.balanceOf(users[i].address)).to.be.equal(
          decimal(200),
        );
      }
    });

    it("should check all working transfer amout or not", async () => {
      const { stakingToken, users } = await loadFixture(basicMethod);

      await stakingToken
        .connect(users[1])
        .transfer(users[2].address, decimal(150));

      expect(await stakingToken.balanceOf(users[1].address)).to.be.equal(
        decimal(50),
      );
      expect(await stakingToken.balanceOf(users[2].address)).to.be.equal(
        decimal(350),
      );
    });
  });
});
