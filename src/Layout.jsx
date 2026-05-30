import React from "react";
import Navbar from "./componets/Header/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="sm:flex-1">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default Layout;
