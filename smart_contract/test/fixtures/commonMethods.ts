import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { basicMethod } from "./index";
import { BigNumber } from "ethers";

// indexer is use for managing all contract dependency methods like methods.
// So creating mapping between all the contract thats easily to call all dependency contract method one-by-one in a single method so it take less time to run testcase.

export async function indexer() {
    const {
        day, currentTime,

        deployer,
        users,

        token,
        rewardToken,
        staking,

        big, dayInSecond, epochDay, decimal
    } = await loadFixture(basicMethod);

    await runtime();

    async function runtime() {
        // set staking contract in the reward contract 
        await rewardToken.connect(deployer).setStaking(staking.address);
    }

    async function mintToken(tokens: any) {
        for (let i = 0; i < 10; i++) {
            await token.mint(users[i].address, decimal(tokens));
            await token.connect(users[i]).approve(staking.address, decimal(tokens));
        }
    }

    async function addPackages() {
        await staking.connect(deployer).addPackages(200, dayInSecond(7));
        await staking.connect(deployer).addPackages(350, dayInSecond(14));
        await staking.connect(deployer).addPackages(500, dayInSecond(30));
        await staking.connect(deployer).addPackages(1000, dayInSecond(60));
    }

    async function stake() {
        await addPackages();

        await mintToken(200000);
        await staking.connect(users[1]).stakeToken(1, 50000);
        await staking.connect(users[2]).stakeToken(2, 100000);
        await staking.connect(users[3]).stakeToken(3, 150000);
        await staking.connect(users[3]).stakeToken(4, 50000);
    }

    async function calculateReward(userIndex: any, indexing: any) {

        let s1 = await staking._stakes(users[userIndex].address, indexing);

        await time.increaseTo(currentTime.add(s1.inDays));

        // after time staking completed calulate percentage of stake
        let percentage = (s1.stakeAmount.mul(s1.percentageInBips)).div(10000);

        // calculate per second reward generated
        let perSecond = (percentage.mul(10 ** 8)).div(s1.inDays);

        // calculate total per second reward generated more time after staking time completed 
        let latestTime = big(await time.latest());
        let calculate = ((latestTime).sub(s1.createdAt)).mul(perSecond);
        calculate = big(Math.ceil(Number(calculate) / (10 ** 8)));

        // console.log("latestTime-....", latestTime, latestTime.sub(s1.createdAt));

        return { perSecond: big(perSecond), calculate: big(calculate) };
    }

    async function calculateRewardExtra(userIndex: any, indexing: any) {

        let s1 = await staking._stakes(users[userIndex].address, indexing);

        await time.increaseTo(currentTime.add(s1.inDays.add(1)));

        // after time staking completed calulate percentage of stake
        let percentage = (s1.stakeAmount.mul(s1.percentageInBips)).div(10000);

        // calculate per second reward generated
        let perSecond = (percentage.mul(10 ** 8)).div(s1.inDays);

        // calculate total per second reward generated more time after staking time completed 
        let latestTime = big(await time.latest());
        let calculate = ((latestTime).sub(s1.createdAt)).mul(perSecond);
        calculate = big(Math.ceil(Number(calculate) / (10 ** 8)));

        // console.log("latestTime-....", latestTime, latestTime.sub(s1.createdAt));

        return { perSecond: big(perSecond), calculate: big(calculate) };
    }
    async function withdrawalToken(userIndex: any, indexing: any) {
        await staking.connect(users[userIndex]).claimReward(indexing)
    }

    return {
        day, currentTime,

        deployer,
        users,

        token,
        rewardToken,
        staking,

        big, dayInSecond, epochDay, decimal,

        mintToken,
        addPackages,
        stake,
        calculateReward,
        calculateRewardExtra,
        withdrawalToken
    };
}
