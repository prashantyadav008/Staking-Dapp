import { useState, useEffect } from "react";
import { Web3 } from "web3";
import swal from "sweetalert";

import ERC20Token_ABI from "../ABI/ERC20Token_ABI.json";
import RewardToken_ABI from "../ABI/RewardToken_ABI.json";
import Staking_ABI from "../ABI/Staking_ABI.json";

export const Web3Index = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    const chainId = (await web3.eth.getChainId()).toString();

    if (chainId !== process.env.REACT_APP_ChainId) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    } else {
      try {
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const ContractInstance = async () => {
  let ercContract = process.env.Contract_Address;
  let ercAbi = ERC20Token_ABI;

  let rewardContract = process.env.Contract_Address;
  let rewardAbi = RewardToken_ABI;

  let stakingContract = process.env.Contract_Address;
  let stakingAbi = Staking_ABI;

  const web3 = await Web3Index();

  let token = new web3.eth.Contract(ercAbi, ercContract);
  let reward = new web3.eth.Contract(rewardAbi, rewardContract);
  let staking = new web3.eth.Contract(stakingAbi, stakingContract);

  return {
    token: token,
    reward: reward,
    staking: staking,
  };
};

export const WalletConnection = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("connectedAddress") || ""
  );

  useEffect(() => {
    Web3Index();
  }, [walletAddress]);

  window.addEventListener("load", async () => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", async function (accounts) {
        localStorage.removeItem("connectedAddress");
        if (accounts.length > 0) {
          swal("Success!", "Wallet Connected Successfully!", "success");
          localStorage.setItem("connectedAddress", accounts[0]);
          setWalletAddress(accounts[0]); // Update walletAddress state
        } else {
          await disconnectWallet();
        }
      });
    } else {
      localStorage.removeItem("connectedAddress");
      swal("Alert!", "Please install MetaMask!", "warning");
    }
  });

  const connectWallet = async () => {
    await setLocalStorage();
    swal("Success!", "Wallet Connected Successfully!", "success");
  };

  const disconnectWallet = async () => {
    localStorage.removeItem("connectedAddress");
    setWalletAddress(""); // Update walletAddress state
    swal("Success!", "Wallet Disconnected Sucessfully!", "success");
  };

  async function setLocalStorage() {
    let address = localStorage.getItem("connectedAddress");
    if (!address) {
      let refreshAddress = await getWalletAddress();
      if (refreshAddress) {
        address = localStorage.getItem("connectedAddress");
        setWalletAddress(address); // Update walletAddress state
      }
    }
  }

  const getWalletAddress = async () => {
    const web3 = new Web3(window.ethereum);
    let walletAddress = await web3.eth.requestAccounts();
    if (walletAddress) {
      localStorage.setItem("connectedAddress", walletAddress[0]);
      return true;
    } else {
      return false;
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(parseInt(process.env.REACT_APP_ChainId)),
          },
        ],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(
                  parseInt(process.env.REACT_APP_ChainId)
                ),
                rpcUrls: [process.env.REACT_APP_ALCHEMY_POLYGON_API_KEY],
                chainName: process.env.REACT_APP_ALCHEMY_POLYGON_NAME,
                nativeCurrency: {
                  name: process.env.REACT_APP_ALCHEMY_POLYGON_NAME,
                  symbol: process.env.REACT_APP_ALCHEMY_POLYGON_SYMBOL, // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: [
                  process.env.REACT_APP_ALCHEMY_POLYGON_SITE_URL,
                ],
              },
            ],
          });

          // var modal = document.getElementById("myModal");
          // modal.style.display = "none";
        } catch (addError) {
          swal("Error!", "Something went wrong, Network not Added!", "error");
          console.error(addError);
        }
      }
      console.error(error);
    }
  };

  return {
    switchNetwork: switchNetwork,
    connectWallet: connectWallet,
    disconnectWallet: disconnectWallet,
  };
};
