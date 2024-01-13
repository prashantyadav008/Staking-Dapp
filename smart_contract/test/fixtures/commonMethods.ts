import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { basicMethod, big, days, decimal } from "./index";

// indexer is use for managing all contract dependency methods like methods.
// In 1 contract method used in a 2nd contract and in 3 contract used in 1,2 contract methods.
// So creating mapping between all the contract thats easily to call all dependency contract method one-by-one in a single method so it take less time to run testcase.

export async function indexer() {
    const {
        day,

        deployer,
        users,

        token,
        rewardToken,
        staking,
    } = await loadFixture(basicMethod);

    await runtime();

    async function runtime() {
        for (let i = 0; i < 10; i++) {
            await token.mint(users[i].address, decimal(2000));
        }

        // set staking contract in the reward contract 
        await rewardToken.connect(deployer).setStaking(staking.address);
    }

    async function addPackages() {
        await staking.connect(deployer).addPackages(200, 7);
        await staking.connect(deployer).addPackages(350, 14);
        await staking.connect(deployer).addPackages(500, 30);
        await staking.connect(deployer).addPackages(1000, 60);
    }

    return {
        day, big, days, decimal,

        deployer, users,

        token,
        rewardToken,
        staking,

        addPackages,
    };
}
