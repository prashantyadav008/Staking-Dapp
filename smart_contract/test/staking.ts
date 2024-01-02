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

  describe.only("Add Packages Methods", () => {
    it("Should check Add Package", async () => {
      const { deployer, stakeContract } = await loadFixture(
        basicMethod,
      );

      await stakeContract.connect(deployer).addPackages(7, 200);
      await stakeContract.connect(deployer).addPackages(14, 350);
      await stakeContract.connect(deployer).addPackages(30, 500);
      await stakeContract.connect(deployer).addPackages(60, 1000);

      expect(await stakeContract.viewAllPAckages()).to.have.deep.members(
        [
          [big(7), big(200)],
          [big(14), big(350)],
          [big(30), big(500)],
          [big(60), big(1000)]
        ]
      );
    });

    it("Should check View Single Package", async () => {
      const { deployer, stakeContract } = await loadFixture(
        basicMethod,
      );

      await stakeContract.connect(deployer).addPackages(7, 200);
      await stakeContract.connect(deployer).addPackages(14, 350);
      await stakeContract.connect(deployer).addPackages(30, 500);
      await stakeContract.connect(deployer).addPackages(60, 1000);

      expect(await stakeContract.packages(0)).to.have.deep.members(
        [big(7), big(200)],
      );

      expect(await stakeContract.packages(1)).to.have.deep.members(
        [big(14), big(350)],
      );

      expect(await stakeContract.packages(2)).to.have.deep.members(
        [big(30), big(500)]
      );

      expect(await stakeContract.packages(3)).to.have.deep.members(
        [big(60), big(1000)]
      );
    });

    describe("Revert Condition for Add Packages Methods", () => {
      it("Should check Only Owner can Add Packages", async () => {
        const { users, stakeContract } = await loadFixture(
          basicMethod,
        );
        expect(stakeContract.connect(users[1]).addPackages(7, 200)).to.revertedWith("Stake: Only Owner can perform this action!");
      });

      it("Should check Days is Greater than 0", async () => {
        const { deployer, stakeContract } = await loadFixture(
          basicMethod,
        );
        expect(stakeContract.connect(deployer).addPackages(0, 200)).to.revertedWith("Stake: Value is Invalid!");
      });

      it("Should check Percentage Value in Bips", async () => {
        const { deployer, stakeContract } = await loadFixture(
          basicMethod,
        );

        expect(stakeContract.connect(deployer).addPackages(7, 20)).to.revertedWith("Stake: Value is Invalid!");
      });
    });
  });
});
