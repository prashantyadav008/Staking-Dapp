import React from "react";

import { Home } from "./Home";

export const StakeToken = (props) => {
  return (
    <>
      <Home />

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Stake Token
                        </h3>
                      </div>

                      <form>
                        <div className="form-group mb-5">
                          <label for="package">Select Package</label>
                          <select className="btn dropdown-toggle">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                        <div className="form-group mb-5">
                          <label for="TokenAddress">Stake Token Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="TokenAddress"
                          />
                        </div>

                        <div className="form-group mb-5">
                          <label for="StakeAmount">Stake Amount</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="StakeAmount"
                          />
                        </div>
                        <button type="submit" className="btn btn-theme">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
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
