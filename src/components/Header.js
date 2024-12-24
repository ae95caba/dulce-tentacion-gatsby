import "../assets/scss/header.scss";
import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "gatsby";
import { useContext, useRef, useEffect, useState } from "react";
import cartIcon from "../images/cart.svg";
import { StaticImage } from "gatsby-plugin-image";
import hamburgerMenuIcon from "../images/hamburger-menu.svg";
import Hamburger from "hamburger-react";

const tabsObj = ["Catalogo", "Kiosko", "Nosotros", "Galeria", "Testimonios"];

export default function Header() {
  /*   const hambugerAnimationRef = useRef(null); */
  const [isOpen, setOpen] = useState(false);
  return (
    <header>
      <div className="content">
        <Link to="/" activeClassName="active">
          <StaticImage
            src="../images/logo-white.png"
            alt="Logo"
            placeholder="blurred"
            className="logo"
          />
        </Link>
        <div className="container">
          <nav>
            <Tabs />
          </nav>
          <input
            type="checkbox"
            id="checkbox"
            onChange={(e) => {
              console.log("change");
              setOpen(e.target.checked);
            }}
          />
          <label for="checkbox" class="overlay"></label>
          <Sidebar />
          <label className="hamburger-menu" htmlFor="checkbox">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </label>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

function CartButton() {
  const { cartItems } = useContext(GlobalContext);
  const [className, setClassName] = useState("as");
  const [isFirstMount, setIsFirstMount] = useState(true);
  console.log(`cart itesm is : ${cartItems}`);
  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    setClassName("wobble-hor-bottom");
  }, [cartItems]);

  const totalItems = () => {
    let totalItems = 0;
    cartItems.forEach((item) => (totalItems += item.count));
    return totalItems;
  };
  return (
    <Link
      to="/carrito"
      className={className}
      id="cart-button"
      onAnimationEnd={() => setClassName("as")}
    >
      <img src={cartIcon} alt="shopping cart" />
      <span id="total-items" className="neon-green">
        {cartItems.length > 0 ? totalItems() : null}
      </span>
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <Tabs />
    </aside>
  );
}

function Tabs() {
  return (
    <>
      {tabsObj.map((tab) => (
        <Link to={`/${tab.toLowerCase()}`} activeClassName="active">
          {tab}
        </Link>
      ))}
    </>
  );
}
