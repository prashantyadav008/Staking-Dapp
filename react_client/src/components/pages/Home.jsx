import React, { useState, useEffect } from "react";

import "../../assets/css/pages.css";

import { NavBar } from "../pages/NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";

export const Home = () => {
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    const contract = await ContractMethods();

    let owner = await contract.getOwner();
    if (owner != false) {
      setWalletAddress(owner);
    }
  };

  return (
    <>
      <NavBar />
      <div className="homeSection">
        <div className="banner">
          <div className="bannerText">
            <p>
              Lock, Earn, and Grow Your Assets! Areon Stake is the easy and
              reliable way to secure your assets while earning passive income.
            </p>
          </div>
        </div>

        <div className="staking">
          <p>Token Calculations</p>
          <table className="table   table-secondary">
            <thead>
              <tr>
                <th scope="col">Staked Token</th>
                <th scope="col">Days</th>
                <th scope="col">Stake Percentage</th>
                <th scope="col">Reward Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100000</td>
                <td>30</td>
                <td>7%</td>
                <td>7000</td>
              </tr>
              <tr>
                <td>100000</td>
                <td>60</td>
                <td>10%</td>
                <td>10000</td>
              </tr>
              <tr>
                <td>100000</td>
                <td>90</td>
                <td>15%</td>
                <td>15000</td>
              </tr>
              <tr>
                <td>100000</td>
                <td>120</td>
                <td>20%</td>
                <td>20000</td>
              </tr>
              <tr>
                <td>100000</td>
                <td>200</td>
                <td>40%</td>
                <td>40000</td>
              </tr>
              <tr>
                <td>100000</td>
                <td>360</td>
                <td>60%</td>
                <td>60000</td>
              </tr>
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
            <form>
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
                <select className="form-control custom-select w-5" id="package">
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                  <option value="90">90 Days</option>
                  <option value="120">120 Days</option>
                  <option value="250">250 Days</option>
                  <option value="360">360 Days</option>
                </select>
              </div>

              <button type="submit" className="btn btn-secondary">
                Calculate Token
              </button>
            </form>

            <table className="mt-5 table table-light">
              <tbody>
                <tr>
                  <td>Start Date</td>
                  <td>2024-02-14</td>
                </tr>
                <tr>
                  <td>End Date</td>
                  <td>2024-03-15</td>
                </tr>
                <tr>
                  <td>Stake Percentage</td>
                  <td>7%</td>
                </tr>
                <tr>
                  <td>Reward Tokens</td>
                  <td>0.005833333333333334</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
