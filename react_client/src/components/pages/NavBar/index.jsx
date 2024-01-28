import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";

import { WalletConnection } from "../../smartContract/Web3Modal/Web3Modal";

export const NavBar = () => {
  const connection = WalletConnection();
  const navigateTo = useNavigate();

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [connection]);

  const switchNetwork = async () => {
    await connection.switchNetwork();
  };

  const connectWallet = async () => {
    await connection.connectWallet();
    let address = localStorage.getItem("connectedAddress");
    setWalletAddress(address);
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
                Switch to the Polygon blockchain network{" "}
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
                <Link className="nav-link" to="/calculateToken">
                  Calculate Token
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Claim Token
                </Link>
              </li>

              <div className="connectWallet">
                {walletAddress ? (
                  <select
                    className="btn btn-success text-white dropdown-toggle"
                    onChange={disconnectWallet}
                    title={walletAddress}>
                    <option>
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
