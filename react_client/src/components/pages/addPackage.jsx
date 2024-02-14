import React from "react";

import { NavBar } from "../pages/NavBar/index";

export const AddPackage = (props) => {
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

                      <form>
                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="Percentage">
                            Percentage (Percentage in Bips):
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="Percentage"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="Days">
                            Days (Days in Seconds):
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="Days"
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
