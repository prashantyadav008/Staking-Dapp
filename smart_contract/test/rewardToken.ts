import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { indexer } from "./fixtures/commonMethods";

describe("Reward Token Contract", () => {
  describe("Mint to Address", () => {
    it("Should check Reward Token Basic Detail", async () => {
      const { deployer, rewardToken, big, decimal, } = await loadFixture(indexer);

      expect(await rewardToken.name()).to.be.equal("Reward Token");
      expect(await rewardToken.symbol()).to.be.equal("REWARD");
      expect(await rewardToken.decimals()).to.be.equal(big("18"));

      expect(await rewardToken.owner()).to.equal(deployer.address);

      expect(await rewardToken.totalSupply()).to.be.equal(decimal(0));
      expect(await rewardToken.balanceOf(deployer.address)).to.be.equal(
        decimal(0),
      );
    });

    it("Should check all working transfer amout or not", async () => {
      const { rewardToken, users, deployer, big, decimal, } = await loadFixture(indexer);
      let amount = decimal(200);

      await rewardToken.connect(deployer).setStaking(deployer.address);

      await rewardToken.connect(deployer).mint(users[1].address, amount);

      await rewardToken
        .connect(users[1])
        .transfer(users[2].address, decimal(150));

      expect(await rewardToken.balanceOf(users[1].address)).to.be.equal(
        decimal(50),
      );
      expect(await rewardToken.balanceOf(users[2].address)).to.be.equal(
        decimal(150),
      );
    });

    it("Should check Set Staking Contract Address", async () => {
      const { rewardToken, staking } = await loadFixture(indexer);
      expect(await rewardToken.staking()).to.equal(staking.address);
    });

    it("Should check Revert Validations Set Staking Contract Address", async () => {
      const { deployer, rewardToken, staking, users, decimal, } = await loadFixture(
        indexer,
      );

      await expect(
        rewardToken.connect(users[1]).mint(users[1].address, decimal(1000)),
      ).to.revertedWith(
        "RewardToken: Only Staking Contract perform this action!",
      );

      await expect(
        rewardToken.connect(users[1]).setStaking(staking.address),
      ).to.revertedWith("RewardToken: Only Owner can perform this action!");

      await expect(
        rewardToken
          .connect(deployer)
          .setStaking("0x0000000000000000000000000000000000000000"),
      ).to.revertedWith("RewardToken: Contract Address is Invalid!");
    });
  });
});
