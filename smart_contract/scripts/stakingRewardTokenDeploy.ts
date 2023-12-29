import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const RewardToken = await ethers.getContractFactory("RewardToken");

  const token = await ERC20Token.deploy();
  const rewardToken = await RewardToken.deploy();

  console.log("ERC20 Token Address-> ", token.address);
  console.log("Reward Token Address-> ", rewardToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Deploy error-> ", error);
    process.exit(1);
  });

// Staking Token Address->  https://mumbai.polygonscan.com/address/0x04B0c1d2A3e9a4cbD4Ad9B79266A020Db6205275#code
// Reward Token Address->  https://mumbai.polygonscan.com/address/0xf235DedF574bC001ba075BFa1013C7f6d328AA28#code
