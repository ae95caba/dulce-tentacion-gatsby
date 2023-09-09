import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { Link } from "gatsby";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";

export default function IceCreamForm({ location }) {
  const modalRef = useRef(null);

  const { catalog, dispatch, cartItems, ACTIONS } = useContext(GlobalContext);
  const allParams = new URLSearchParams(location.search);
  const productId = allParams.get("id");
  const product = catalog?.iceCream?.find((obj) => obj._id === productId);

  const [choosenFlavours, setChoosenFlavours] = useState([]);

  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setChoosenFlavours((prev) => [...prev, value]);
    } else {
      const index = choosenFlavours.indexOf(value);
      const copy = choosenFlavours;
      copy.splice(index, 1);

      setChoosenFlavours([...copy]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (choosenFlavours.length > 0) {
      dispatch({
        type: "add-cart-item",
        payload: { id: product._id, product: structuredClone(product) },
      });
    } else {
      modalRef.current.showModal();
    }
  }

  return (
    <form id="ice-cream" onSubmit={handleSubmit}>
      {<h1>{product?.name}</h1>}
      <h3>
        Sabores
        {<span>{` ${choosenFlavours?.length}/${product?.flavours}`}</span>}
      </h3>
      <div className="container">
        {catalog?.flavoursList.map((flavourValue) => (
          <label key={flavourValue} htmlFor={flavourValue}>
            <span>{flavourValue}</span>

            <input
              id={flavourValue}
              type="checkbox"
              disabled={
                !choosenFlavours.includes(flavourValue) &&
                choosenFlavours.length >= product?.flavours
              }
              name="flavour"
              value={flavourValue}
              onChange={handleChange}
            />
          </label>
        ))}
      </div>

      <dialog ref={modalRef}>
        <p>Debes elegir por lo menos un sabor</p>
        <button
          type="button"
          onClick={() => {
            modalRef.current.close();
          }}
        >
          Ok
        </button>
      </dialog>

      <button>Aceptar</button>
    </form>
  );
}
