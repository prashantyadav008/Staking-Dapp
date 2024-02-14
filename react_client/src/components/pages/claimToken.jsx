import React from "react";
import { NavBar } from "../pages/NavBar/index";

export const ClaimToken = () => {
  return (
    <>
      <NavBar />

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-3">
                      <div className="mb-3">
                        <h3 className="h4 font-weight-bold text-theme">
                          Claim Reward Token
                        </h3>
                      </div>

                      <form>
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
                          Claimed Token
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">
                          Total Rewards Tokens
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
