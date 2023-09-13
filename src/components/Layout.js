import React from "react";
import { useState } from "react";
import Header from "./Header";
import { Link } from "gatsby";
import Footer from "./Footer";
import "../styles/global.scss"; // Import the global CSS file
import "../styles/HamburgerMenu.scss";
export default function Layout({ children }) {
  // const [cartItems, setCartItems] = useState(0);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
