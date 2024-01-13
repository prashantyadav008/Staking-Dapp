import { BigNumber } from "ethers";
import { ethers } from "hardhat";

let minutes = 60;
let seconds = 60;
let hours = 24;

let day = minutes * seconds * hours;

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
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(token.address, rewardToken.address);


  return {
    day,
    deployer,
    users,
    token,
    rewardToken,
    staking,
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

// convert value into Big Number
export function days(value: any) {
  let days = value * day;
  return BigNumber.from(days);
}
