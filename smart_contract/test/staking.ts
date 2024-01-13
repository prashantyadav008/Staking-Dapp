import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { indexer } from "./fixtures/commonMethods";

describe("Staking Token Contract", () => {
  describe("Basic Public Methods", () => {
    it("Should check Public Method", async () => {
      const { token, rewardToken, staking } = await loadFixture(indexer);

      expect(await staking.stakingToken()).to.be.equal(token.address);
      expect(await staking.rewardToken()).to.be.equal(rewardToken.address);
    });
  });

  describe("Add Packages Methods", () => {
    it("Should check View Single Package", async () => {
      const { staking, addPackages, big, days } = await loadFixture(indexer);

      await addPackages();

      expect(await staking.totalPackages()).to.have.equal(
        big(4)
      );

    });

    it("Should check View Single Package", async () => {
      const { staking, addPackages, big, days } = await loadFixture(indexer);

      await addPackages();

      expect(await staking.packages(1)).to.have.deep.members([
        big(200),
        days(7),
        true
      ]);

      expect(await staking.packages(2)).to.have.deep.members([
        big(350),
        days(14),
        true
      ]);

      expect(await staking.packages(3)).to.have.deep.members([
        big(500),
        days(30),
        true
      ]);

      expect(await staking.packages(4)).to.have.deep.members([
        big(1000),
        days(60),
        true
      ]);
    });

    describe("Revert Condition for Add Packages Methods", () => {
      it("Should check Only Owner can Add Packages", async () => {
        const { users, staking } = await loadFixture(indexer);
        expect(staking.connect(users[1]).addPackages(200, 7)).to.revertedWith(
          "Stake: Only Owner can perform this action!",
        );
      });

      it("Should check Percentage & Days is Greater than 0", async () => {
        const { deployer, staking } = await loadFixture(indexer);
        expect(staking.connect(deployer).addPackages(200, 0)).to.revertedWith(
          "Stake: Value is Invalid!",
        );

        expect(staking.connect(deployer).addPackages(20, 7)).to.revertedWith(
          "Stake: Value is Invalid!",
        );
      });
    });
  });

  describe("Update Packages Methods", () => {
    it("Should check Update Package", async () => {
      const { deployer, staking, addPackages, big, days } = await loadFixture(indexer);

      await addPackages();
      await staking.connect(deployer).updatePackages(1, 1000, 20, true)

      expect(await staking.packages(1)).to.have.deep.members([
        big(1000),
        days(20),
        true
      ]);
    });

    describe("Revert Condition for Update Packages Methods", () => {
      it("Should check Only Owner can Update Packages", async () => {
        const { users, staking } = await loadFixture(indexer);
        expect(staking.connect(users[1]).updatePackages(1, 1000, 20, false)).to.revertedWith(
          "Stake: Only Owner can perform this action!",
        );
      });

      it("Should check Invalid Package Id", async () => {
        const { deployer, staking } = await loadFixture(indexer);
        expect(staking.connect(deployer).updatePackages(0, 1000, 10, false)).to.revertedWith(
          "Stake: Invalid Package Id!",
        );

        expect(staking.connect(deployer).updatePackages(10, 1000, 10, false)).to.revertedWith(
          "Stake: Invalid Package Id!",
        );
      });

      it("Should check Percentage & Days is Greater than 0", async () => {
        const { deployer, staking } = await loadFixture(indexer);
        expect(staking.connect(deployer).updatePackages(1, 1000, 0, true)).to.revertedWith(
          "Stake: Value is Invalid!",
        );

        expect(staking.connect(deployer).updatePackages(1, 0, 10, true)).to.revertedWith(
          "Stake: Value is Invalid!",
        );
      });
    });
  });
});
