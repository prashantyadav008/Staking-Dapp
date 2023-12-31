import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { big, decimal, basicMethod } from "./index";

describe("Reward Token Contract", () => {
  describe("Mint to Address", () => {
    it("Should check Reward Token Basic Detail", async () => {
      const { deployer, rewardToken } = await loadFixture(basicMethod);

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
      const { rewardToken, users } = await loadFixture(basicMethod);
      let amount = decimal(200);

      await rewardToken.mint(users[1].address, amount);

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
      const { deployer, rewardToken, stakeContract } = await loadFixture(
        basicMethod,
      );
      expect(await rewardToken.stakeContract()).to.equal(
        "0x0000000000000000000000000000000000000000",
      );
      await rewardToken
        .connect(deployer)
        .setStakeContract(stakeContract.address);

      expect(await rewardToken.stakeContract()).to.equal(stakeContract.address);
    });

    it("Should check Revert Validations Set Staking Contract Address", async () => {
      const { deployer, rewardToken, stakeContract, users } = await loadFixture(
        basicMethod,
      );

      await expect(
        rewardToken.connect(users[1]).setStakeContract(stakeContract.address),
      ).to.revertedWith("RewardToken: Only Owner can perform this action!");

      await expect(
        rewardToken
          .connect(deployer)
          .setStakeContract("0x0000000000000000000000000000000000000000"),
      ).to.revertedWith("RewardToken: Contract Address is Invalid!");
    });
  });
});
