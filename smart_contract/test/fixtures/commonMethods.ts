import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { basicMethod, big, days, decimal } from "./index";

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
        await staking.connect(deployer).addPackages(200, 7);
        await staking.connect(deployer).addPackages(350, 14);
        await staking.connect(deployer).addPackages(500, 30);
        await staking.connect(deployer).addPackages(1000, 60);
    }

    async function stake() {
        await addPackages();

        await mintToken(200000);
        await staking.connect(users[1]).stakeToken(1, 50000);
        await staking.connect(users[2]).stakeToken(2, 100000);
        await staking.connect(users[3]).stakeToken(3, 150000);
        await staking.connect(users[3]).stakeToken(4, 50000);
    }

    async function calculateRewardUser1() {

        await stake();
        await time.increaseTo(currentTime.add(days(7)));

        return 0;
    }



    return {
        day, big, days, decimal, currentTime,

        deployer, users,

        token,
        rewardToken,
        staking,

        mintToken,
        addPackages,
        stake,
    };
}
