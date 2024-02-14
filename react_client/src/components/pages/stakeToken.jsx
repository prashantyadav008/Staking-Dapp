import React from "react";

import { NavBar } from "../pages/NavBar/index";

export const StakeToken = (props) => {
  return (
    <>
      <NavBar />

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
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

                      <form>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="SelectPackage">
                            Select Your Package:
                          </label>
                          <select className="form-control custom-select">
                            <option defaultValue="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="TokenAddress">
                            Stake Token Address:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="TokenAddress"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="StakeAmount">
                            Stake Amount:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="StakeAmount"
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
                        <h4 className="text-white mb-4">
                          Selected Package Token Rewards!
                        </h4>
                        <p className="lead text-white">0</p>
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
