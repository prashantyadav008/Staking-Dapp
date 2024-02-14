import React, { useState, useEffect } from "react";

import "../../assets/css/pages.css";

import { NavBar } from "../pages/NavBar/index";

import stakingBanner from "../../assets/images/stakingBanner.jpg";

import { WalletConnection } from "../smartContract/Web3Modal/Web3Modal";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="homeSection">
        <div className="banner  ">
          <div className="bannerText">
            <p>
              Lock, Earn, and Grow Your Assets! Areon Stake is the easy and
              reliable way to secure your assets while earning passive income.
            </p>
          </div>
        </div>

        <div className="staking">
          <p>Token Calculations</p>
          <table class="table table-hover table-secondary">
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
      </div>
    </>
  );
};
