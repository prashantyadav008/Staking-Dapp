/** @format */

import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const walletAddress = localStorage.getItem("connectedAddress");
  const { token, reward, staking } = await ContractInstance();

  const getOwner = async () => {
    let owner = await staking.methods
      .owner()
      .call()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("get owner->>>>>>>>>>>", err);
        return false;
      });

    return owner;
  };

  const totalPackages = async () => {
    const totalPackage = await staking.methods
      .totalPackages()
      .call()
      .then((result) => {
        return Number(result);
      })
      .catch((error) => {
        console.log("totalPackages error--->> ", error);
        return false;
      });

    return totalPackage;
  };

  const getPackages = async (id) => {
    let newResult = {};
    const packages = await staking.methods
      .packages(id)
      .call()
      .then((result) => {
        newResult.percentageInBips = Number(result.percentageInBips) / 100;
        newResult.inDays = Number(result.inDays) / 86400;
        newResult.active = result.active;

        return newResult;
      })
      .catch((error) => {
        console.log("getPackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const getAllPackages = async (totalPackages) => {
    let viewAllPAckages = [];

    for (let i = 1; i <= totalPackages; i++) {
      viewAllPAckages.push(await getPackages(i));
    }

    viewAllPAckages = await Promise.all(viewAllPAckages);
    return viewAllPAckages;
  };

  const getStakeDetail = async (id) => {
    const packages = await staking.methods
      ._stakes(walletAddress, id)
      .call()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("getPackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const viewStakes = async () => {
    const packages = await staking.methods
      .viewStakes(walletAddress)
      .call()
      .then((result) => {
        let allStakes = result.map(
          ({
            stakeAmount,
            totalClaimedReward,
            percentageInBips,
            inDays,
            createdAt,
            withdrawAt,
            claimed,
          }) => {
            let createdTime = Number(createdAt) * 1000;
            let withdrawTime;
            if (Number(withdrawTime) > 0) {
              let withdrawTime1 = (Number(withdrawAt) + Number(inDays)) * 1000;
              withdrawTime = new Date(withdrawTime1).toLocaleDateString("sv");
            } else {
              withdrawTime = Number(withdrawAt);
            }

            return {
              stakeAmount: Number(stakeAmount),
              totalClaimedReward: Number(totalClaimedReward),
              percentageInBips: Number(percentageInBips) / 100,
              inDays: Number(inDays) / 86400,
              createdAt: new Date(createdTime).toLocaleDateString("sv"),
              withdrawAt: withdrawTime,
              claimed: claimed,
            };
          }
        );

        return allStakes;
      })
      .catch((error) => {
        console.log("viewStakes error--->> ", error);
        return false;
      });

    return packages;
  };

  const stakeList = async () => {
    const packages = await staking.methods
      .stakeList()
      .call()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("getPackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const balanceOf = async () => {
    const packages = await token.methods
      .balanceOf(walletAddress)
      .call()
      .then((result) => {
        return Number(result);
      })
      .catch((error) => {
        console.log("balanceOf error--->> ", error);
        return false;
      });

    return packages;
  };

  const rewardBalanceOf = async () => {
    const packages = await reward.methods
      .balanceOf(walletAddress)
      .call()
      .then((result) => {
        return Number(result);
      })
      .catch((error) => {
        console.log("balanceOf error--->> ", error);
        return false;
      });

    return packages;
  };

  const allowance = async () => {
    const packages = await token.methods
      // eslint-disable-next-line no-undef
      .allowance(walletAddress, process.env.Staking_Address)
      .call()
      .then((result) => {
        return Number(result);
      })
      .catch((error) => {
        console.log("allowance error--->> ", error);
        return false;
      });

    return packages;
  };

  const mint = async (tokenAmount) => {
    const packages = await token.methods
      .mint(walletAddress, tokenAmount)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("mint error--->> ", error);
        return false;
      });

    return packages;
  };

  const approveToken = async (tokenAmount) => {
    const packages = await token.methods
      // eslint-disable-next-line no-undef
      .approve(process.env.Staking_Address, tokenAmount)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("approveToken error--->> ", error);
        return false;
      });

    return packages;
  };

  const addPackages = async (percentage, days) => {
    const packages = await staking.methods
      .addPackages(percentage, days)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("addPackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const updatePackages = async (id, percentage, days, status) => {
    const packages = await staking.methods
      .updatePackages(id, percentage, days, status)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("updatePackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const stakeToken = async (packageId, stakeAmount) => {
    const packages = await staking.methods
      .stakeToken(packageId, stakeAmount)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("stakeToken error--->> ", error);
        return false;
      });

    return packages;
  };

  const claimedReward = async (index) => {
    const packages = await staking.methods
      .updatePackages(index)
      .send({ from: walletAddress })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("claimedReward error--->> ", error);
        return false;
      });

    return packages;
  };

  return {
    getOwner: getOwner,
    totalPackages: totalPackages,
    getPackages: getPackages,
    getAllPackages: getAllPackages,
    getStakeDetail: getStakeDetail,
    viewStakes: viewStakes,
    stakeList: stakeList,
    balanceOf: balanceOf,
    rewardBalanceOf: rewardBalanceOf,
    allowance: allowance,

    mint: mint,
    approveToken: approveToken,
    addPackages: addPackages,
    updatePackages: updatePackages,
    stakeToken: stakeToken,
    claimedReward: claimedReward,
  };
};
