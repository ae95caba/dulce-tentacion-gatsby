import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
/* import Image from "./Image"; */

export default function Shop() {
  const { catalog, dispatch, cartItems, ACTIONS, isLoading } =
    useContext(GlobalContext);

  return (
    <>
      {isLoading ? (
        "cargando"
      ) : (
        <>
          <h1>Catalogo</h1>
          <div className="cards-container">
            {catalog.iceCream.map((product, index) => {
              return product.outOfStock ? (
                ""
              ) : (
                <Card
                  //this key props cause useless re-renders if set to uniqid()
                  key={`${product.name}`}
                  product={product}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

//this rerenders every time the addProductToCart function gets called
function Card({ product }) {
  const { catalog, dispatch, cartItems, ACTIONS } = useContext(GlobalContext);

  function handleClick() {
    if (!product.flavours) {
      dispatch({
        type: "add-cart-item",
        payload: { id: product._id, product: structuredClone(product) },
      });
    } else {
      const encodedParamValue = encodeURIComponent(product.name);
      navigate(`/form?id=${product._id}`);
    }
  }
  return (
    <div className="card">
      {/*  <Image url={product.imgUrl} /> */}
      <p className="product-name">{product.name}</p>
      <p className="product-price">$ {product.price}</p>

      <button onClick={handleClick} className={`to-cart  `}>
        <span>Añadir</span>

        <img
          style={{ filter: "invert(1)" }}
          src="/img/to-cart.svg"
          alt="cart icon"
        />
      </button>
    </div>
  );
}
