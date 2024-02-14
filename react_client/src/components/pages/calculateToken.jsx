import React from "react";

import { NavBar } from "../pages/NavBar/index";

export const CalculateToken = () => {
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
                          Calculate Reward Token
                        </h3>
                      </div>

                      <form>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="WalletAddress">
                            Wallet Address:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="WalletAddress"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="SelectPackage">
                            Select Stake Id:
                          </label>
                          <select className="form-control custom-select">
                            <option defaultValue="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

                        <button type="submit" className="btn btn-theme">
                          Calculate Token
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
