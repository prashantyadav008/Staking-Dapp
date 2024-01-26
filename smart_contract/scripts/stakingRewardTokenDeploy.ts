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

// ERC20 Token Address->  https://mumbai.polygonscan.com/address/0x7397e0440BcE5A39F8BaCD6690551090922A7aB9#code
// Reward Token Address->  https://mumbai.polygonscan.com/address/0xbe51BCB26B434553c1b45b6BEd218745A1EfB286#code
// Staking Token Address->  https://mumbai.polygonscan.com/address/0x4EcF25b8893DFD44208EF4528EA33a3Cee25B0b2#code
