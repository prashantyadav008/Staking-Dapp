import React, { useState, useEffect } from "react";

import { NavBar } from "../pages/NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const UpdatePackage = () => {
  const [owner, setOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();

  const [packagePercentage, setPackagePercentage] = useState(0);
  const [packageDays, setPackageDays] = useState(0);
  const [packageId, setPackageId] = useState(0);
  const [packageStatus, setPackageStatus] = useState();

  const [allPackages, setAllPackage] = useState([]);

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    document.getElementById("form_section").classList.add("d-none");

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

    let totalPackages = await contract.totalPackages();

    let allPackages = await contract.getAllPackages(totalPackages);
    setAllPackage(allPackages);
  };

  const getPackages = async (id) => {
    const contract = await ContractMethods();
    let result = await contract.getPackages(id);

    if (result != false) {
      setPackageId(id);
      setPackagePercentage(result.percentageInBips);
      setPackageDays(result.inDays);
      setPackageStatus(result.active);
      document.getElementById("form_section").classList.remove("d-none");
    }
  };

  const percentageHandleChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      (e.target.value >= 1 && e.target.value <= 100)
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

  const updatePackages = async (event) => {
    event.preventDefault();
    let walletAddress1 = walletAddress ? walletAddress.toLowerCase() : null;
    let owner1 = owner ? owner.toLowerCase() : null;

    if (walletAddress1 == owner1 && walletAddress1 != null) {
      document.getElementById("loaderVisibility").classList.add("is-active");

      let id = document.querySelector("#packageId").value;
      let percentage = document.querySelector("#percentage").value;
      let days = document.querySelector("#days").value;
      let status = document.querySelector("#percentageStatus").value === "true";

      if (percentage > 0 && days > 0) {
        const contract = await ContractMethods();

        percentage = percentage * 100;
        days = days * 24 * 60 * 60;

        let result = await contract.updatePackages(
          id,
          percentage,
          days,
          status
        );
        if (result) {
          swal("Success!", "Add Packages Successfully!", "success");
        } else {
          swal("Error!", "Something went wrong, Package not Added!", "error");
        }
      } else {
        swal("Error!", "Invalid Values!", "error");
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
          <div className="col-xl-6">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h3 className="h4 font-weight-bold text-theme">
                        View All Packages
                      </h3>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Package Id</th>
                            <th scope="col">Percentage</th>
                            <th scope="col">Days</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update</th>
                          </tr>
                        </thead>

                        <tbody>
                          {allPackages.length > 0 ? (
                            allPackages.map((item, key) => (
                              <tr key={key + 1}>
                                <th scope="row">{key + 1}</th>
                                <td>{item.percentageInBips + "%"} </td>
                                <td>{item.inDays}</td>
                                <td>{item.active ? "Active" : "In Active"}</td>
                                <td>
                                  <ul className="list-inline m-0">
                                    <li className="list-inline-item">
                                      <button
                                        className="btn btn-success btn-sm rounded-0"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit"
                                        onClick={(e) => getPackages(key + 1)}>
                                        <i className="fa fa-pencil">Update</i>
                                      </button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">No Data Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-12" id="form_section">
                    <div className="p-3">
                      <div className="mb-3">
                        <h3 className="h4 font-weight-bold text-theme">
                          Update Packages
                        </h3>
                      </div>

                      <form onSubmit={updatePackages}>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="packageId">
                            Package Id:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="packageId"
                            value={packageId}
                            disabled={true}
                          />
                        </div>

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

                        <div className="form-group mb-4">
                          <label
                            className="fw-medium"
                            htmlFor="percentageStatus">
                            Package Status:
                          </label>
                          <select
                            className="form-control custom-select"
                            id="percentageStatus"
                            value={packageStatus ? "true" : "false"} // Use value instead of defaultValue
                            onChange={(e) =>
                              setPackageStatus(e.target.value === "true")
                            }>
                            <option value="true">Active</option>
                            <option value="false">In Active</option>{" "}
                            {/* Changed "In Active" to "Inactive" */}
                          </select>
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Update Package
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
