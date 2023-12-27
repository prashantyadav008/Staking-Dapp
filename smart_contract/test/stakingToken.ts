import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { big, decimal, basicMethod } from "./index";

describe("Staking Token Contract", () => {
  describe("Basic Public Methods", () => {
    it("Should check Public Method", async () => {
      const { stakingToken, rewardToken, stakeContract } = await loadFixture(
        basicMethod,
      );

      expect(await stakeContract.stakingToken()).to.be.equal(
        stakingToken.address,
      );
      expect(await stakeContract.rewardToken()).to.be.equal(
        rewardToken.address,
      );
    });
  });

  describe("Stake Token Methods", () => {
    it("Should check Stake Tokens", async () => {
      const { stakingToken, rewardToken, stakeContract } = await loadFixture(
        basicMethod,
      );

      expect(await stakeContract.stakingToken()).to.be.equal(
        stakingToken.address,
      );
      expect(await stakeContract.rewardToken()).to.be.equal(
        rewardToken.address,
      );
    });
  });
});
