import React from "react";

import { Home } from "./Home";

export const CalculateToken = () => {
  return (
    <>
      <Home />
      <h1>Calculate Token</h1>

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your email address and password to access admin
                        panel.
                      </p>

                      <form>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                          />
                        </div>
                        <div className="form-group mb-5">
                          <label for="exampleInputPassword1">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
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
                          This beautiful theme yours!
                        </h4>
                        <p className="lead text-white">
                          "Best investment i made for a long time. Can only
                          recommend it for other users."
                        </p>
                        <p>- Admin User</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted text-center mt-3 mb-0">
              Don't have an account?{" "}
              <a href="" className="text-primary ml-1">
                register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
