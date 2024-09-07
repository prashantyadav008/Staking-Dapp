/** @format */

import { useState, useEffect } from "react";

import "../../assets/css/pages.css";

import { NavBar } from "../pages/NavBar/index";

import swal from "sweetalert";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";

export const Home = () => {
  const [allPackages, setAllPackage] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [packagePercentage, setPackagePercentage] = useState(0);
  const [rewardToken, setRewardToken] = useState(0);

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    document.getElementById("form_section").classList.add("d-none");

    const contract = await ContractMethods();

    let totalPackages = await contract.totalPackages();

    let allPackages = await contract.getAllPackages(totalPackages);
    setAllPackage(allPackages);
  };

  const getPackages = async (e) => {
    e.preventDefault();

    let amount = document.querySelector("#amount").value;
    if (amount <= 0) {
      swal("Error!", "Amount should be greater than 0", "error");
      return false;
    }

    let id = document.querySelector("#package").value;

    const contract = await ContractMethods();
    let result = await contract.getPackages(id);

    let currentTimestamp = Math.floor(new Date().getTime() / 1000);
    let endTimestamp = currentTimestamp + result.inDays * 86400;

    let startTime = new Date(currentTimestamp * 1000).toLocaleDateString(
      "zh-Hans-CN"
    );
    let endTime = new Date(endTimestamp * 1000).toLocaleDateString(
      "zh-Hans-CN"
    );

    if (result != false) {
      setStartDate(startTime);
      setEndDate(endTime);
      setPackagePercentage(result.percentageInBips);
      setRewardToken((amount * result.percentageInBips) / 100);
      document.getElementById("form_section").classList.remove("d-none");
    }
  };

  return (
    <>
      <NavBar />
      <div className="homeSection">
        <div className="banner">
          <div className="bannerText">
            <p>
              Lock, Earn, and Grow Your Assets! Stake is the easy and reliable
              way to secure your assets while earning passive income.
            </p>
          </div>
        </div>

        <div className="staking">
          <p>Token Calculations</p>
          <table className="table table-secondary">
            <thead>
              <tr>
                <td colSpan="2">Staked Token</td>
                <td colSpan="1">Stake Percentage</td>
                <td colSpan="1">Days</td>
                <td colSpan="2">Reward Token</td>
              </tr>
            </thead>
            <tbody>
              {allPackages.length > 0 ? (
                allPackages.map((item, key) =>
                  item.active ? (
                    <tr key={key + 1}>
                      <td colSpan="2">100000</td>
                      <td colSpan="1">{item.percentageInBips} %</td>
                      <td colSpan="1">{item.inDays} </td>
                      <td colSpan="2">
                        {Math.round((100000 * item.percentageInBips) / 100)}
                      </td>
                    </tr>
                  ) : (
                    <tr key={key + 1}></tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="6">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="calculateToken">
          <p>Calculate</p>
          <small>
            Calculate in this specially designed area to discover your potential
            earnings
          </small>

          <div className="formDetail">
            <form onSubmit={getPackages}>
              <div className="form-group mb-4">
                <label className="fw-medium mb-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  placeholder="0.000000"
                />
              </div>

              <div className="form-group mb-4">
                <label className="fw-medium mb-2" htmlFor="package">
                  Period
                </label>
                <select
                  className="form-control custom-select w-5"
                  id="package"
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
                    <option value=""></option>
                  )}
                </select>
              </div>

              <button type="submit" className="btn btn-secondary">
                Calculate Token
              </button>
            </form>

            <table className="mt-5 table table-light" id="form_section">
              <tbody>
                <tr>
                  <td>Start Date</td>
                  <td>{startDate}</td>
                </tr>
                <tr>
                  <td>End Date</td>
                  <td>{endDate}</td>
                </tr>
                <tr>
                  <td>Stake Percentage</td>
                  <td>{packagePercentage}%</td>
                </tr>
                <tr>
                  <td>Reward Tokens</td>
                  <td>{rewardToken}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
