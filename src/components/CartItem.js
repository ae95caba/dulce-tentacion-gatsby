import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function CartItem({ cartItem }) {
  const { catalog, dispatch, cartItems, ACTIONS, isLoading } =
    useContext(GlobalContext);
  const [showDetails, setShowDetails] = useState(false);
  const product = cartItem.product;
  return (
    <div className="cart-item">
      <img
        className="remove"
        alt="remove"
        src="/img/recycle-bin.png"
        onClick={() =>
          dispatch({
            type: "remove-stack",
            payload: { product: product },
          })
        }
      />
      <div className="left">
        <img className="thumbnail" src={product.imgUrl} alt={product.name} />
      </div>
      <div className="right">
        <div className="description">
          <p>{product.name}</p>
          <p>$ {cartItem.getTotalPrice()}</p>
        </div>

        {!product.flavours ? (
          <div className="quantity">
            <button
              onClick={() => {
                dispatch({
                  type: "remove-cart-item",
                  payload: { product: product },
                });
              }}
            >
              -
            </button>
            <span>unidades: {cartItem.count}</span>
            <button
              onClick={() => {
                dispatch({
                  type: "add-cart-item",
                  payload: { product: product },
                });
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="details-button"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            Detalle
          </button>
        )}
      </div>
      {showDetails && (
        <div className="details">
          <h3>Sabores</h3>
          <ul>
            {product.flavours.map((flavour) => {
              return <li key={uniqid()}>{flavour}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
