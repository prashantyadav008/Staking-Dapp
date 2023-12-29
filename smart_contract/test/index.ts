import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function basicMethod() {
  // random address
  const [deployer, ...users] = await ethers.getSigners();

  // Deploy Token Contract
  const tokens = await ethers.getContractFactory("ERC20Token");
  const token = await tokens.deploy();

  // Deploy Token Contract
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();

  // Deploy Token Contract
  const StakeContract = await ethers.getContractFactory("StakeContract");
  const stakeContract = await StakeContract.deploy(
    token.address,
    rewardToken.address,
  );

  for (let i = 0; i < 10; i++) {
    await token.mint(users[i].address, decimal(200));
  }

  return {
    deployer,
    users,
    token,
    rewardToken,
    stakeContract,
  };
}

// convert value into Decimal 1^18 or 1e18
export function decimal(value: any) {
  const powValue = BigNumber.from("10").pow(18);
  return BigNumber.from(value).mul(powValue);
}

// convert value into Big Number
export function big(value: any) {
  return BigNumber.from(value);
}
