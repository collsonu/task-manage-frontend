import React from "react";
import { Footer, Header } from "../components";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet  />
    </>
  );
};

export default Layout;
