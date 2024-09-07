import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const Staking = await ethers.getContractFactory("Staking");

  const token = await ERC20Token.deploy();
  const rewardToken = await RewardToken.deploy();
  const staking = await Staking.deploy(token.address, rewardToken.address);

  await token.deployTransaction.wait(5);
  await rewardToken.deployTransaction.wait(5);
  await staking.deployTransaction.wait(5);


  await hre.run("verify:verify", {
    address: token.address,
    contract: "contracts/ERC20Token.sol:ERC20Token",
  });

  await hre.run("verify:verify", {
    address: rewardToken.address,
    contract: "contracts/RewardToken.sol:RewardToken",
  });

  await hre.run("verify:verify", {
    address: staking.address,
    contract: "contracts/Staking.sol:Staking",
    constructorArguments: [token.address, rewardToken.address],
  });


  console.log("ERC20 Token Address-> ", token.address);
  console.log("Reward Token Address-> ", rewardToken.address);
  console.log("Staking Token Address-> ", staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Deploy error-> ", error);
    process.exit(1);
  });

// ERC20 Token   --->> https://sepolia.etherscan.io/address/0xaae34aFdD1C896Cc295D3A6819b3E66D3d9e95c2#code
// Reward Token  --->> https://sepolia.etherscan.io/address/0x77046abb72C959C3f8a9bCeaF7AeAD5Fb088A2Ee#code
// Staking Token --->> https://sepolia.etherscan.io/address/0x4991EF504EA0303A39A26aBe1008245439EC2c60#code