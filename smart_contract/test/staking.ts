import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { indexer } from "./fixtures/commonMethods";
import { exit } from "process";
import { BigNumber } from "ethers";

describe.only("Staking Token Contract", () => {
  describe("Basic Public Methods", () => {
    it("Should check Public Method", async () => {
      const { token, rewardToken, staking } = await loadFixture(indexer);

      expect(await staking.stakingToken()).to.be.equal(token.address);
      expect(await staking.rewardToken()).to.be.equal(rewardToken.address);
    });
  });

  describe("Add Packages Methods", () => {
    it("Should check View Single Package", async () => {
      const { staking, addPackages, big, dayInSecond } = await loadFixture(indexer);

      await addPackages();

      expect(await staking.totalPackages()).to.have.equal(
        big(4)
      );

    });

    it("Should check View Single Package", async () => {
      const { staking, addPackages, big, dayInSecond } = await loadFixture(indexer);

      await addPackages();

      expect(await staking.packages(1)).to.have.deep.members([
        big(200),
        dayInSecond(7),
        true
      ]);

      expect(await staking.packages(2)).to.have.deep.members([
        big(350),
        dayInSecond(14),
        true
      ]);

      expect(await staking.packages(3)).to.have.deep.members([
        big(500),
        dayInSecond(30),
        true
      ]);

      expect(await staking.packages(4)).to.have.deep.members([
        big(1000),
        dayInSecond(60),
        true
      ]);
    });

    describe("Revert Condition for Add Packages Methods", () => {
      it("Should check Only Owner can Add Packages", async () => {
        const { users, staking, dayInSecond } = await loadFixture(indexer);
        expect(staking.connect(users[1]).addPackages(200, dayInSecond(7))).to.revertedWith(
          "Stake: Only Owner can perform this action!",
        );
      });

      it("Should check Percentage & Days is Greater than 0", async () => {
        const { deployer, staking, dayInSecond } = await loadFixture(indexer);
        expect(staking.connect(deployer).addPackages(200, dayInSecond(0))).to.revertedWith(
          "Stake: Value is Invalid!",
        );

        expect(staking.connect(deployer).addPackages(20, dayInSecond(7))).to.revertedWith(
          "Stake: Value is Invalid!",
        );
      });
    });
  });

  describe("Update Packages Methods", () => {
    it("Should check Update Package", async () => {
      const { deployer, staking, addPackages, big, dayInSecond } = await loadFixture(indexer);

      await addPackages();
      await staking.connect(deployer).updatePackages(1, 1000, dayInSecond(20), true)

      expect(await staking.packages(1)).to.have.deep.members([
        big(1000),
        dayInSecond(20),
        true
      ]);
    });

    it("Should check Inactive Package", async () => {
      const { deployer, staking, addPackages, big, dayInSecond } = await loadFixture(indexer);

      await addPackages();
      await staking.connect(deployer).updatePackages(1, 1000, dayInSecond(20), false)

      expect(await staking.packages(1)).to.have.deep.members([
        big(1000),
        dayInSecond(20),
        false
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

  describe("Stake Token Methods", () => {
    it("Should check Single User Staking", async () => {
      const { staking, dayInSecond, big, users, stake } = await loadFixture(indexer);

      await stake();

      let stakes1 = await staking._stakes(users[1].address, 0);
      let stakes2 = await staking._stakes(users[2].address, 0);
      let stakes3 = await staking._stakes(users[3].address, 0);
      let stakes4 = await staking._stakes(users[3].address, 1);

      expect(await stakes1).to.have.deep.members([
        big(50000),
        big(0),
        big(200),
        dayInSecond(7),
        big(stakes1.createdAt),
        big(0),
        false
      ]);

      expect(await stakes2).to.have.deep.members([
        big(100000),
        big(0),
        big(350),
        dayInSecond(14),
        big(stakes2.createdAt),
        big(0),
        false
      ]);

      expect(await stakes3).to.have.deep.members([
        big(150000),
        big(0),
        big(500),
        dayInSecond(30),
        big(stakes3.createdAt),
        big(0),
        false
      ]);

      expect(await stakes4).to.have.deep.members([
        big(50000),
        big(0),
        big(1000),
        dayInSecond(60),
        big(stakes4.createdAt),
        big(0),
        false
      ]);
    });

    it("Should check View All Staking", async () => {
      const { staking, dayInSecond, big, users, stake } = await loadFixture(indexer);

      await stake();

      let stakes1 = await staking._stakes(users[3].address, 0);
      let stakes2 = await staking._stakes(users[3].address, 1);

      expect(await staking.viewStakes(users[3].address)).to.have.deep.members([
        [
          big(150000),
          big(0),
          big(500),
          dayInSecond(30),
          big(stakes1.createdAt),
          big(0),
          false
        ],
        [
          big(50000),
          big(0),
          big(1000),
          dayInSecond(60),
          big(stakes2.createdAt),
          big(0),
          false
        ]
      ]);
    });

    it("Should check Stakers", async () => {
      const { staking, users, stake } = await loadFixture(indexer);

      await stake();

      expect(await staking._stakers(0)).to.equal(users[1].address);
      expect(await staking._stakers(1)).to.equal(users[2].address);
      expect(await staking._stakers(2)).to.equal(users[3].address);
    });

    it("Should check Stakers List", async () => {
      const { staking, users, stake } = await loadFixture(indexer);

      await stake();

      expect(await staking.isStaked(users[1].address)).to.equal(true);
      expect(await staking.isStaked(users[2].address)).to.equal(true);
      expect(await staking.isStaked(users[3].address)).to.equal(true);
      expect(await staking.isStaked(users[4].address)).to.equal(false);

    });

    it("Should check User is Stakers or not", async () => {
      const { staking, users, stake } = await loadFixture(indexer);

      await stake();

      expect(await staking.stakerList()).to.have.deep.members([users[1].address, users[2].address, users[3].address]);

    });

    it("Should check Staked Token Balance", async () => {
      const { token, users, stake, decimal } = await loadFixture(indexer);

      let stakeAmount = decimal(200000);
      await stake();

      expect(await token.balanceOf(users[1].address)).equal(stakeAmount.sub(50000));
      expect(await token.balanceOf(users[2].address)).equal(stakeAmount.sub(100000));
      expect(await token.balanceOf(users[3].address)).equal(stakeAmount.sub(150000 + 50000));

    });

    describe("Revert Condition for Stake Token Methods", () => {
      it("Should check Invalid Package Id", async () => {
        const { staking, users, addPackages } = await loadFixture(indexer);

        await addPackages();

        await expect(staking.connect(users[1]).stakeToken(0, 50000)).to.revertedWith("Stake: Invalid Package Id!")
        await expect(staking.connect(users[1]).stakeToken(5, 50000)).to.revertedWith("Stake: Invalid Package Id!")

      });

      it("Should check Inactive Package", async () => {
        const { deployer, staking, users, addPackages } = await loadFixture(indexer);

        await addPackages();
        await staking.connect(deployer).updatePackages(1, 1000, 20, false)

        await expect(staking.connect(users[1]).stakeToken(1, 50000)).to.revertedWith("Stake: Package not Active Yet!")
      });

      it("Should check Stake Amount is not Enough", async () => {
        const { staking, users, addPackages } = await loadFixture(indexer);

        await addPackages();

        await expect(staking.connect(users[1]).stakeToken(1, 9000)).to.revertedWith("Stake: Stake Amount is greater than 10000!")
      });

      it("Should check Staking Token not Enough", async () => {
        const { staking, users, addPackages } = await loadFixture(indexer);

        await addPackages();

        await expect(staking.connect(users[1]).stakeToken(1, 50000)).to.revertedWith("Stake: Not Enough Token!")
      });
    });
  });

  describe("Calculate Reward Token Methods", () => {
    it("Should check Calculate Reward for All User", async () => {
      const { calculateReward, staking, users, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p1, calculate: c1 } = await calculateReward(1, 0);
      expect(await staking.calculateStake(users[1].address, 0)).to.have.deep.members([p1, c1]);

      let { perSecond: p2, calculate: c2 } = await calculateReward(2, 0);
      expect(await staking.calculateStake(users[2].address, 0)).to.have.deep.members([p2, c2]);

      let { perSecond: p3, calculate: c3 } = await calculateReward(3, 0);
      expect(await staking.calculateStake(users[3].address, 0)).to.have.deep.members([p3, c3]);

      let { perSecond: p3_1, calculate: c3_1 } = await calculateReward(3, 1);
      expect(await staking.calculateStake(users[3].address, 1)).to.have.deep.members([p3_1, c3_1]);
    });

    it.only("Should check Calculate Reward After Exceed 5 days", async () => {
      const { calculateRewardExtra, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p, calculate: c } = await calculateRewardExtra(1, 0);
      await withdrawalToken(1, 0);

      let stakes1 = await staking._stakes(users[1].address, 0);

      console.log(p, c, stakes1);

    });

    it("Should check Calculate Reward for No User", async () => {
      const { calculateReward, staking, users, big, } = await loadFixture(indexer);

      await expect(staking.calculateStake(users[1].address, 0)).to.reverted;

      await expect(staking.calculateStake(users[2].address, 0)).to.reverted;

      await expect(staking.calculateStake(users[3].address, 0)).to.reverted;

      await expect(staking.calculateStake(users[3].address, 0)).to.reverted;
    });
  });

  describe("Claim Reward Token Methods", () => {
    it("Should check Calculate Reward for User 1", async () => {
      const { calculateReward, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p, calculate: c } = await calculateReward(1, 0);
      await withdrawalToken(1, 0);

      let stakes1 = await staking._stakes(users[1].address, 0);

      expect(stakes1).to.have.deep.members([
        big(50000),
        c,
        big(200),
        dayInSecond(7),
        big(stakes1.createdAt),
        big(stakes1.withdrawAt),
        true
      ]);

      expect(await rewardToken.balanceOf(users[1].address)).equal(c);
    });

    it("Should check Calculate Reward for User 2", async () => {
      const { calculateReward, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p, calculate: c } = await calculateReward(2, 0);
      await withdrawalToken(2, 0);

      let stakes2 = await staking._stakes(users[2].address, 0);

      expect(stakes2).to.have.deep.members([
        big(100000),
        c,
        big(350),
        dayInSecond(14),
        big(stakes2.createdAt),
        big(stakes2.withdrawAt),
        true
      ]);

      expect(await rewardToken.balanceOf(users[2].address)).equal(c);
    });

    it("Should check Calculate Reward for User 3", async () => {
      const { calculateReward, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p, calculate: c } = await calculateReward(3, 0);
      await withdrawalToken(3, 0);

      let stakes3 = await staking._stakes(users[3].address, 0);

      expect(stakes3).to.have.deep.members([
        big(150000),
        c,
        big(500),
        dayInSecond(30),
        big(stakes3.createdAt),
        big(stakes3.withdrawAt),
        true
      ]);

      expect(await rewardToken.balanceOf(users[3].address)).equal(c);
    });

    it("Should check Calculate Reward for User 3 for 2nd Stake", async () => {
      const { calculateReward, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

      await stake();
      let { perSecond: p, calculate: c } = await calculateReward(3, 0);
      await withdrawalToken(3, 0);

      let { perSecond: p1, calculate: c1 } = await calculateReward(3, 1);
      await withdrawalToken(3, 1);

      let stakes3 = await staking._stakes(users[3].address, 1);

      expect(stakes3).to.have.deep.members([
        big(50000),
        c1,
        big(1000),
        dayInSecond(60),
        big(stakes3.createdAt),
        big(stakes3.withdrawAt),
        true
      ]);

      expect(await rewardToken.balanceOf(users[3].address)).equal(c.add(c1));
    });


    it("Should check Staked Token Balance for User 1", async () => {
      const { calculateReward, withdrawalToken, token, users, decimal, stake, } = await loadFixture(indexer);

      await stake();
      await calculateReward(1, 0);
      await withdrawalToken(1, 0);

      expect(await token.balanceOf(users[1].address)).equal(decimal(200000));
    });

    it("Should check Staked Token Balance for User 2", async () => {
      const { calculateReward, withdrawalToken, token, users, decimal, stake, } = await loadFixture(indexer);

      await stake();
      await calculateReward(2, 0);
      await withdrawalToken(2, 0);

      expect(await token.balanceOf(users[2].address)).equal(decimal(200000));
    });

    it("Should check Staked Token Balance for User 3", async () => {
      const { calculateReward, withdrawalToken, token, users, decimal, stake, } = await loadFixture(indexer);

      await stake();
      await calculateReward(3, 0);
      await withdrawalToken(3, 0);

      //50000 for second stake
      expect(await token.balanceOf(users[3].address)).equal(decimal(200000).sub(50000));
    });

    it("Should check Staked Token Balance for User 3 for 2nd Stake", async () => {
      const { calculateReward, withdrawalToken, token, users, decimal, stake, } = await loadFixture(indexer);

      await stake();
      await calculateReward(3, 0);
      await calculateReward(3, 1);

      await withdrawalToken(3, 0);
      await withdrawalToken(3, 1);

      expect(await token.balanceOf(users[3].address)).equal(decimal(200000));
    });

    describe("Revert Condition for Claim Reward Token Methods", () => {
      it("Should check Calculate Reward for User 1", async () => {
        const { staking, users, stake, } = await loadFixture(indexer);

        await stake();

        let stakes1 = await staking._stakes(users[1].address, 0);

        await expect(staking.connect(users[1]).claimReward(0)).to.revertedWith("Stake: Staking Time not Completed!");
        await expect(staking.connect(users[2]).claimReward(0)).to.revertedWith("Stake: Staking Time not Completed!");
        await expect(staking.connect(users[3]).claimReward(0)).to.revertedWith("Stake: Staking Time not Completed!");
        await expect(staking.connect(users[3]).claimReward(1)).to.revertedWith("Stake: Staking Time not Completed!");
      });

      it("Should check Calculate Reward for All User", async () => {
        const { calculateReward, withdrawalToken, staking, users, big, dayInSecond, rewardToken, stake, } = await loadFixture(indexer);

        await stake();
        await calculateReward(1, 0);
        await withdrawalToken(1, 0);

        await calculateReward(2, 0);
        await withdrawalToken(2, 0);

        await calculateReward(3, 0);
        await withdrawalToken(3, 0);

        await calculateReward(3, 1);
        await withdrawalToken(3, 1);


        await expect(staking.connect(users[1]).claimReward(0)).to.revertedWith("Stake: Reward Token already withdrawal!");
        await expect(staking.connect(users[2]).claimReward(0)).to.revertedWith("Stake: Reward Token already withdrawal!");
        await expect(staking.connect(users[3]).claimReward(0)).to.revertedWith("Stake: Reward Token already withdrawal!");
        await expect(staking.connect(users[3]).claimReward(1)).to.revertedWith("Stake: Reward Token already withdrawal!");
      });
    });
  });
});
