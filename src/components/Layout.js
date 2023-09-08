import React from "react";
import { useState } from "react";

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

function Header() {
  return <div>HEader</div>;
}

function Footer() {
  return <div>Footer</div>;
}
