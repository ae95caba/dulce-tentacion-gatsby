import * as React from "react";
import { useContext } from "react";
import { Link } from "gatsby";
import { GlobalContext } from "../context/GlobalContext";

export default function Home() {
  const { catalog, dispatch, cartItems, ACTIONS } = useContext(GlobalContext);

  return (
    <div>
      <div>Hello world!</div>
      <Link to="/about">ab</Link>
      <button
        onClick={() => {
          dispatch({ type: "add-cart-item", payload: { id: "tito" } });
        }}
      >
        Dispatch type add
      </button>
      <button
        onClick={() => {
          dispatch({ type: "remove-cart-item", payload: { id: "tito" } });
        }}
      >
        Dispatch type remove
      </button>
      <button onClick={() => console.log(cartItems)}>Log cartitems</button>
      {/* <Sub /> */}
    </div>
  );
}

/* function Sub() {
  console.log("sub comp");
  return <div>asdf</div>;
}
 */
