import React, { useState, useEffect } from "react";

import { NavBar } from "../pages/NavBar/index";

import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";
import swal from "sweetalert";

export const ViewStakes = () => {
  const [viewStakes, setViewStakes] = useState([]);

  useEffect(() => {
    contractMethods();
  }, []);

  const contractMethods = async () => {
    const contract = await ContractMethods();

    let viewStakes = await contract.viewStakes();
    setViewStakes(viewStakes);
  };

  return (
    <>
      <NavBar />

      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Stake Id</th>
                            <th scope="col">Stake Amount</th>
                            <th scope="col">Percentage</th>
                            <th scope="col">Days</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Claimed Status</th>
                            <th scope="col">Remaining Time</th>
                          </tr>
                        </thead>

                        <tbody>
                          {viewStakes.length > 0 ? (
                            viewStakes.map((item, key) => (
                              <tr key={key + 1}>
                                <th scope="row">{key + 1}</th>
                                <td>{item.stakeAmount} </td>
                                <td>{item.percentageInBips}% </td>
                                <td>{item.inDays}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                  {item.withdrawAt > 0
                                    ? item.withdrawAt
                                    : "Not Claimed"}
                                </td>
                                <td>{"Remaining Time "}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">No Data Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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
