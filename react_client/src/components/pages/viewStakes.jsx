/** @format */

import { useState, useEffect } from "react";
import { NavBar } from "../pages/NavBar/index";
import { ContractMethods } from "../smartContract/Web3Modal/ContractMethods";

export const ViewStakes = () => {
  const [viewStakes, setViewStakes] = useState([]);

  useEffect(() => {
    contractMethods();
    // Set interval to update remaining time every second
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const contractMethods = async () => {
    const contract = await ContractMethods();
    let viewStakes = await contract.viewStakes();
    setViewStakes(viewStakes);
  };

  // Function to update remaining time
  const updateRemainingTime = () => {
    setViewStakes((prevStakes) =>
      prevStakes.map((stake) => ({
        ...stake,
        remainingTime: calculateRemainingTime(stake),
      }))
    );
  };

  // Function to calculate remaining time
  const calculateRemainingTime = (item) => {
    const now = new Date();
    if (item.withdrawAt > 0) {
      return "Stake Time Completed";
    } else {
      const createdAt = new Date(item.createdAt);
      const expiryDate = new Date(createdAt);
      expiryDate.setDate(createdAt.getDate() + item.inDays);
      const differenceInMs = expiryDate.getTime() - now.getTime();
      return calculateTimeDifference(differenceInMs);
    }
  };

  const calculateTimeDifference = (differenceInMs) => {
    const remainingTime = new Date(differenceInMs);
    const month = remainingTime.getUTCMonth();
    const days = remainingTime.getUTCDate() - 1;
    const hours = remainingTime.getUTCHours();
    const minutes = remainingTime.getUTCMinutes();
    const seconds = remainingTime.getUTCSeconds();
    return `${month} Month ${days} days ${hours} hour ${minutes} min ${seconds} sec`;
  };

  return (
    <>
      <NavBar />
      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-1">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <h3 className="h4 font-weight-bold text-theme">
                        View All Stake Detail
                      </h3>
                    </div>
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
                                <td>{item.stakeAmount}</td>
                                <td>{item.percentageInBips}%</td>
                                <td>{item.inDays}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                  {item.withdrawAt > 0
                                    ? item.withdrawAt
                                    : "Not Claimed"}
                                </td>
                                <td>{item.remainingTime}</td>
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
