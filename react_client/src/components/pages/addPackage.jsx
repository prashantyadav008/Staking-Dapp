import React, { useState, useEffect } from "react";

import { NavBar } from "../pages/NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const AddPackage = () => {
  const [owner, setOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();

  const [packagePercentage, setPackagePercentage] = useState("");
  const [packageDays, setPackageDays] = useState("");

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
  };

  const percentageHandleChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      (e.target.value >= 0 && e.target.value <= 100)
    ) {
      setPackagePercentage(e.target.value);
    } else if (e.target.value === "") {
      setPackagePercentage("");
    }
  };

  const daysHandleChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      e.target.value >= 0
    ) {
      setPackageDays(e.target.value);
    } else if (e.target.value === "") {
      setPackageDays("");
    }
  };

  const addPackages = async (event) => {
    event.preventDefault();
    let walletAddress1 = walletAddress ? walletAddress.toLowerCase() : null;
    let owner1 = owner ? owner.toLowerCase() : null;

    if (walletAddress1 == owner1 && walletAddress1 != null) {
      document.getElementById("loaderVisibility").classList.add("is-active");

      let percentage = document.querySelector("#percentage").value;
      let days = document.querySelector("#days").value;

      if (percentage > 0 && days > 0) {
        const contract = await ContractMethods();

        percentage = percentage * 100;
        days = days * 24 * 60 * 60;
        console.log(percentage, days);

        let result = await contract.addPackages(percentage, days);
        if (result) {
          swal("Success!", "Add Packages Successfully!", "success");
        } else {
          swal("Error!", "Something went wrong, Package not Added!", "error");
        }
      } else {
        swal("Error!", "Invalid Values!", "error");
      }
      document.getElementById("loaderVisibility").classList.remove("is-active");
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
                          Add Packages
                        </h3>
                      </div>

                      <form onSubmit={addPackages}>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="percentage">
                            Percentage:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="percentage"
                            value={packagePercentage}
                            onChange={percentageHandleChange}
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="days">
                            Days (Days in Seconds):
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="days"
                            value={packageDays}
                            onChange={daysHandleChange}
                          />
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Add Package
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
