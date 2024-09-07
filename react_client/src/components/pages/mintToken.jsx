/** @format */

import { useState, useEffect } from "react";

import { NavBar } from "./NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const MintToken = () => {
  const [mintAmount, setMintAmount] = useState("");
  const [balanceOf, setBalanceOf] = useState(0);

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    const contract = await ContractMethods();
    let balanceOf = await contract.balanceOf();
    setBalanceOf(balanceOf);
  };

  const handleChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      e.target.value >= 0
    ) {
      setMintAmount(e.target.value);
    } else if (e.target.value === "") {
      setMintAmount(0);
    }
  };

  const mintingToken = async (event) => {
    event.preventDefault();

    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      let amount = document.querySelector("#mintAmount").value;

      if (amount <= 0) {
        swal("Erorr!", "Amount should be greater than 0!", "error");
        document
          .getElementById("loaderVisibility")
          .classList.remove("is-active");
        return false;
      }

      const contract = await ContractMethods();

      let mintingStatus = await contract.mint(amount);
      if (!mintingStatus) {
        swal("Error!", "Token not Minted!", "error");
      }
    } catch (error) {
      console.log("stake error-->> ", error);
    }

    await contractMethods();
    setMintAmount(0);
    document.getElementById("loaderVisibility").classList.remove("is-active");
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
                          Mint Token
                        </h3>
                      </div>

                      <form onSubmit={mintingToken}>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="mintAmount">
                            Amount:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="mintAmount"
                            value={mintAmount}
                            onChange={handleChange}
                            placeholder="0.000000"
                          />
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Mint
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-5 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">Your Token Balance</h4>
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
