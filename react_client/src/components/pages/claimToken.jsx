import React, { useState, useEffect } from "react";
import { NavBar } from "../pages/NavBar/index";
import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const ClaimToken = () => {
  const [owner, setOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [viewStakes, setViewStakes] = useState([]);

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }

    const contract = await ContractMethods();

    let owner = await contract.getOwner();
    if (owner != false) {
      setOwner(owner);
    }
    let viewStakes = await contract.viewStakes();
    setViewStakes(viewStakes);
  };

  const stakeToken = async (event) => {
    event.preventDefault();

    let walletAddress1 = walletAddress ? walletAddress.toLowerCase() : null;
    let owner1 = owner ? owner.toLowerCase() : null;

    if (walletAddress1 == owner1 && walletAddress1 != null) {
      document.getElementById("loaderVisibility").classList.add("is-active");

      try {
        let id = document.querySelector("#stakeId").value;

        const contract = await ContractMethods();
        let stake = await contract.getStakeDetail(id);

        let currentTime = Math.floor(Date.now() / 1000);
        let endTime = new Date(
          Number(stake.createdAt) + Number(stake.inDays)
        ).getTime();

        if (endTime > currentTime) {
          swal("Erorr!", "Stake Time not Completed!", "error");
          document
            .getElementById("loaderVisibility")
            .classList.remove("is-active");
          return false;
        }

        let stakeStatus = await contract.stakeToken(id, amount);
        if (stakeStatus) {
          swal("Success!", "Reward Token Claimed Successfully!", "success");
        } else {
          swal("Error!", "Something went wrong, Token not Claimed!", "error");
        }
      } catch (error) {
        console.log("stake error-->> ", error);
      }

      document.getElementById("loaderVisibility").classList.remove("is-active");
      await contractMethods();
    } else {
      swal("Error!", "Only Contract Owner can perform this action!", "error");
    }
  };

  return (
    <>
      <NavBar />

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-12">
                    <div className="p-3">
                      <div className="mb-3">
                        <h3 className="h4 font-weight-bold text-theme">
                          Claim Reward Token
                        </h3>
                      </div>

                      <form onSubmit={stakeToken}>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="SelectPackage">
                            Select Stake Id:
                          </label>
                          <select
                            className="form-control custom-select w-5"
                            id="stakeId"
                            defaultValue="0">
                            {viewStakes.length > 0 ? (
                              viewStakes.map((item, index) => (
                                <option key={index} value={index}>
                                  {item.stakeAmount +
                                    ", " +
                                    item.percentageInBips +
                                    "%,   " +
                                    item.inDays +
                                    " Days"}
                                </option>
                              ))
                            ) : (
                              <option key="empty" value="">
                                Choose Stake Detail...
                              </option>
                            )}
                          </select>
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Claimed Token
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
