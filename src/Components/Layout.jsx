import React from "react";
import { useLocation } from "react-router-dom";
import '../Background.css'; // or wherever you placed your background style

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={isHomePage ? "" : "page-background"}>
      {children}
    </div>
  );
};

export default Layout;
