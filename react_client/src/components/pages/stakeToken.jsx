import React, { useState, useEffect } from "react";

import { NavBar } from "../pages/NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const StakeToken = () => {
  const [owner, setOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [allPackages, setAllPackage] = useState([]);

  const [stakeAmount, setStakeAmount] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);
  const [allowance, setAllowance] = useState();

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
    setOwner(owner);

    let balanceOf = await contract.balanceOf();
    setBalanceOf(balanceOf);

    let totalPackages = await contract.totalPackages();

    let allPackages = await contract.getAllPackages(totalPackages);
    setAllPackage(allPackages);

    let allowance = await contract.allowance();
    setAllowance(allowance);
  };

  const handleChange = (e) => {
    const regex = /^\d+(\.\d+)?$/;

    if (e.target.value !== "" && regex.test(e.target.value)) {
      setStakeAmount(e.target.value);
    } else if (e.target.value === "") {
      setStakeAmount(0);
    }
  };

  const stakeToken = async (event) => {
    event.preventDefault();

    let walletAddress1 = walletAddress ? walletAddress.toLowerCase() : null;
    let owner1 = owner ? owner.toLowerCase() : null;

    if (walletAddress1 == owner1 && walletAddress1 != null) {
      document.getElementById("loaderVisibility").classList.add("is-active");

      try {
        let id = document.querySelector("#packageId").value;
        let amount = document.querySelector("#stakeAmount").value;

        if (id <= 0) {
          swal("Erorr!", "Id is not valid!", "error");
          document
            .getElementById("loaderVisibility")
            .classList.remove("is-active");
          return false;
        }

        if (amount <= 10000) {
          swal("Erorr!", "Amount should be greater than 10000!", "error");
          document
            .getElementById("loaderVisibility")
            .classList.remove("is-active");
          return false;
        }

        const contract = await ContractMethods();

        if (amount > allowance) {
          let approveStatus = await contract.approveToken(amount - allowance);
          if (!approveStatus) {
            swal("Error!", "Token not Approved!", "error");
            document
              .getElementById("loaderVisibility")
              .classList.remove("is-active");
            await contractMethods();

            return false;
          }
        }

        let stakeStatus = await contract.stakeToken(id, amount);
        if (stakeStatus) {
          swal("Success!", "Package Submit Successfully!", "success");
        } else {
          swal("Error!", "Something went wrong, Package not Added!", "error");
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
          <div className="col-xl-9">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-7">
                    <div className="p-3">
                      <div className="mb-3">
                        <h3 className="h4 font-weight-bold text-theme">
                          Stake Token
                        </h3>
                      </div>

                      <form onSubmit={stakeToken}>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="packageId">
                            Select Your Package:
                          </label>
                          <select
                            className="form-control custom-select w-5"
                            id="packageId"
                            defaultValue="1">
                            {allPackages.length > 0 ? (
                              allPackages.map((item, index) =>
                                item.active ? (
                                  <option key={index} value={index + 1}>
                                    {item.percentageInBips +
                                      "%, " +
                                      item.inDays +
                                      " Days"}
                                  </option>
                                ) : null
                              )
                            ) : (
                              <option key="empty" value="">
                                Choose Package...
                              </option>
                            )}
                          </select>
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="stakeAmount">
                            Stake Amount:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="stakeAmount"
                            value={stakeAmount}
                            onChange={handleChange}
                            placeholder="0.000000"
                          />
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Stake Token
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-5 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">Total Stake Token!</h4>
                        <p className="lead text-white">{balanceOf}</p>
                      </div>
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
