import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./componets/Header/Navbar.jsx";
import Footer from "./componets/Footer.jsx";

function Layout() {
  

  return (
    <>
      <Navbar/>
      <div className="sm:flex-1">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default Layout;
