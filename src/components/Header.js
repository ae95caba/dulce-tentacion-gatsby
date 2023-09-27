import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "gatsby";
import { useContext } from "react";
import cartIcon from "../images/cart.svg";
import Logo from "./Images/Logo";
const tabsObj = ["Catalogo", "Nosotros", "Galeria", "Testimonios"];
export default function Header() {
  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      <div className="container">
        <nav>
          <Tabs />
        </nav>

        <input type="checkbox" id="checkbox" />
        <label for="checkbox" class="overlay"></label>
        <Sidebar />
        <label className="hamburger-menu" htmlFor="checkbox"></label>

        <CartButton />
      </div>
    </header>
  );
}

function CartButton() {
  const { cartItems } = useContext(GlobalContext);
  return (
    <Link
      to="/carrito"
      /*  the following could me unnecesary but better keep it */

      className={cartItems.length > 0 ? "" : null}
      id="cart-button"
    >
      <img src={cartIcon} alt="shopping cart" />
      <span id="total-items" className="neon-green">
        {cartItems.length > 0 ? cartItems.length : null}
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
        <Link to={`/${tab.toLowerCase()}`}>{tab}</Link>
      ))}
    </>
  );
}
