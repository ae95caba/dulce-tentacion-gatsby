import React from "react";

import Header from "./Header";

import Footer from "./Footer";
import "../styles/global.scss"; // Import the global CSS file
import "../styles/HamburgerMenu.scss";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
