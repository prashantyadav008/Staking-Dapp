import React from "react";

import { Home } from "./Home";

export const UpdatePackage = (props) => {
  return (
    <>
      <Home />

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
                          <label className="fw-medium" htmlFor="SelectPackage">
                            Select Package Id:
                          </label>
                          <select className="form-control custom-select">
                            <option defaultValue="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

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

                        <div className="form-group mb-4">
                          <label className="fw-medium" htmlFor="SelectPackage">
                            Package Status:
                          </label>
                          <select className="form-control custom-select">
                            <option defaultValue="0">Choose...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
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
