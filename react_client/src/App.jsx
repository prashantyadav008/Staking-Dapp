import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageNotFound } from "./components/PageNotFound";
import { Home } from "./components/pages/Home";
import { StakeToken } from "./components/pages/stakeToken";
import { CalculateToken } from "./components/pages/calculateToken";
import { ClaimToken } from "./components/pages/claimToken";
import { AddPackage } from "./components/pages/addPackage";
import { UpdatePackage } from "./components/pages/updatePackage";

function App() {
  const router = createBrowserRouter([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <Home /> },
    {
      path: "/stakeToken",
      element: <StakeToken />,
    },
    {
      path: "/calculateToken",
      element: <CalculateToken />,
    },
    {
      path: "/claimToken",
      element: <ClaimToken />,
    },
    {
      path: "/AddPackage",
      element: <AddPackage />,
    },
    {
      path: "/UpdatePackage",
      element: <UpdatePackage />,
    },
  ]);

  return (
    <>
      <div
        className="mainLoader loader loader-default "
        id="loaderVisibility"
        data-text="Loading...  Wait for Transaction to Complete!"></div>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
