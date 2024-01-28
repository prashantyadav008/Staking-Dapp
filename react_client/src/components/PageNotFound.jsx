import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found">
        <p className="error">404</p>
        <p className="op">Opps..!!! Page not Found</p>
        <p className="msg">Page Does not Exist You Are looking for</p>
        <p className="msg">
          <Link className="btn btn-primary" to="/">
            Go to Homepage
          </Link>
        </p>
      </div>
    </>
  );
};
