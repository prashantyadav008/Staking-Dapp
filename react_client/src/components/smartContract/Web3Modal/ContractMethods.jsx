import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const walletAddress = localStorage.getItem("connectedAddress");
  const contractInstance = await ContractInstance();

  const getOwner = async () => {
    const owner = await contractInstance.methods
      .owner()
      .call()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("getOwner error--->> ", error);
        return false;
      });

    return owner;
  };

  const totalPackages = async () => {
    const totalPackage = await contractInstance.methods
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
    const packages = await contractInstance.methods
      .packages(id)
      .call()
      .then((result) => {
        result.percentageInBips = Number(result.percentageInBips);
        result.inDays = Number(result.inDays);
        return result;
      })
      .catch((error) => {
        console.log("getPackages error--->> ", error);
        return false;
      });

    return packages;
  };

  const getAllPackages = async () => {
    const totalPackages = await totalPackages();
    let viewAllPAckages = [];

    for (let i = 1; i <= totalPackages; i++) {
      viewAllPAckages.push(await getPackages(i));
    }

    viewAllPAckages = await Promise.all(viewAllPAckages);
    return viewAllPAckages;
  };

  const viewStakes = async (userAddress) => {
    const packages = await contractInstance.methods
      .viewStakes(userAddress)
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

  const addPackages = async (percentage, days) => {
    const packages = await contractInstance.methods
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
    const packages = await contractInstance.methods
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
    const packages = await contractInstance.methods
      .stakeToken(packageId, stakeAmount)
      .call()
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
    const packages = await contractInstance.methods
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
    viewStakes: viewStakes,

    addPackages: addPackages,
    updatePackages: updatePackages,
    stakeToken: stakeToken,
    claimedReward: claimedReward,
  };
};
