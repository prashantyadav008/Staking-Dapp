import { time } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";




export async function basicMethod() {

  let minutes = 60;
  let seconds = 60;
  let hours = 24;

  let day = minutes * seconds * hours;
  // let currentTime = big(await time.latest());

  let currentTime = big(Math.floor(new Date().getTime() / 1000)).add(
    40,
  );


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



  // convert value into Decimal 1^18 or 1e18
  function decimal(value: any) {
    const powValue = BigNumber.from("10").pow(18);
    return BigNumber.from(value).mul(powValue);
  }

  // convert value into Big Number
  function big(value: any) {
    return BigNumber.from(value);
  }

  // convert days in second and add on current time
  function epochDay(value: any) {
    let dayInSecond = currentTime.add(value * day);
    return BigNumber.from(dayInSecond);
  }

  // convert days in per second
  function dayInSecond(value: any) {
    return BigNumber.from(value * day);
  }

  return {

    currentTime,
    day,
    deployer,
    users,
    token,
    rewardToken,
    staking,


    decimal,
    big,
    epochDay,
    dayInSecond,
  };
}

