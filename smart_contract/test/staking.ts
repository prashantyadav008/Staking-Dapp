import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { big, decimal, basicMethod } from "./index";

describe("Staking Token Contract", () => {
  describe("Basic Public Methods", () => {
    it("Should check Public Method", async () => {
      const { token, rewardToken, stakeContract } = await loadFixture(
        basicMethod,
      );

      expect(await stakeContract.stakingToken()).to.be.equal(
        token.address,
      );
      expect(await stakeContract.rewardToken()).to.be.equal(
        rewardToken.address,
      );
    });
  });

  describe("Stake Token Methods", () => {
    it("Should check Stake Tokens", async () => {
      const { token, rewardToken, stakeContract } = await loadFixture(
        basicMethod,
      );

      expect(await stakeContract.stakingToken()).to.be.equal(
        token.address,
      );
      expect(await stakeContract.rewardToken()).to.be.equal(
        rewardToken.address,
      );
    });
  });
});
