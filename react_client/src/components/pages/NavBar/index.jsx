/** @format */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

import { WalletConnection } from "../../smartContract/Web3Modal/Web3Modal";

import { ContractMethods } from "../../smartContract/Web3Modal/ContractMethods";
export const NavBar = () => {
  const connection = WalletConnection();

  const [owner, setOwner] = useState();
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    contractMethods();
  }, [connection]);

  const contractMethods = async () => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }

    const contract = await ContractMethods();

    let owner = await contract.getOwner();
    let newOwner = owner ? owner.toLowerCase() : null;
    setOwner(newOwner);
  };

  const switchNetwork = async () => {
    await connection.switchNetwork();
  };

  const connectWallet = async () => {
    await connection.connectWallet();
    let address = localStorage.getItem("connectedAddress");
    let newAdd = address ? address.toLowerCase() : null;
    setWalletAddress(newAdd);
  };

  const disconnectWallet = async () => {
    await connection.disconnectWallet();
    setWalletAddress(null);
  };

  return (
    <>
      <div id="myModal" className="modal ">
        <div className="modal-content my-4">
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>

          <h5 className="fw-bold my-4">Wrong network connection detected</h5>

          <p className="fw-medium mb-8">
            Looks like your current network selection is not supported. Please{" "}
            <span className="fw-semibold">
              <Link onClick={switchNetwork}>
                Switch to the Sepolia blockchain network{" "}
              </Link>
              in your wallet to continue,
            </span>
            or sign out.
          </p>
        </div>
      </div>

      <div id="full-embed">
        <header>
          <div id="actions">
            <ul className="normalRes">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stakeToken">
                  Stake Token
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mintToken">
                  Mint Token
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewStakes">
                  View Stakes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/claimToken">
                  Claim Token
                </Link>
              </li>

              {owner == walletAddress ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addPackage">
                      Add Package
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/updatePackage">
                      Update Package
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <div className="connectWallet">
                {walletAddress ? (
                  <select
                    className="btn buttonDropdown dropdown-toggle"
                    onChange={disconnectWallet}
                    title={walletAddress}>
                    <option className="btn btn-light">
                      {walletAddress.substring(0, 7)}......
                      {walletAddress.substring(36)}
                    </option>
                    <option className="btn btn-danger">Disconnect</option>
                  </select>
                ) : (
                  <button className="btn btn-light" onClick={connectWallet}>
                    Connect Wallet
                  </button>
                )}
              </div>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};
