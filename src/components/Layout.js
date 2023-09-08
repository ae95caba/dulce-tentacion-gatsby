import React from "react";
import { useState } from "react";
import { Link } from "gatsby";
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
  return (
    <div>
      <Link to="/about">ab</Link>
      <Link to="/shop">shop</Link>
      <Link to="/">home</Link>
    </div>
  );
}

function Footer() {
  return <div>Footer</div>;
}
