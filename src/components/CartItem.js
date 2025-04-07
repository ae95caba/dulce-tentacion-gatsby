import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import { GlobalContext } from "../context/GlobalContext";
import recycleBin from "../images/recycle-bin.png";
import { useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
export default function CartItem({ cartItem }) {
  const { dispatch } = useContext(GlobalContext);
  const [showDetails, setShowDetails] = useState(false);
  const product = cartItem.product;
  const image = getImage(product.localImage);
  const inputRef = useRef(null);
  return (
    <div className="cart-item">
      <img
        className="remove"
        alt="remove"
        src={recycleBin}
        onClick={() =>
          dispatch({
            type: "remove-stack",
            payload: { product: product },
          })
        }
      />
      <div className="left faded faded-right">
        <GatsbyImage image={image} alt={product.name} />
      </div>
      <div className="right">
        <div className="description">
          <p className="name">{product.name}</p>
          <p className="price">$ {cartItem.getTotalPrice()}</p>
        </div>

        <div className="quantity">
          <button
            onClick={() => {
              dispatch({
                type: "remove-cart-item",
                payload: { product: product, quantity: 1 },
              });
              inputRef.current.value = cartItem.count - 1;
            }}
          >
            -
          </button>
          <input
            ref={inputRef}
            required
            type="number"
            defaultValue={cartItem.count}
            onBlur={(e) => {
              console.log(cartItem);
              if (e.target.value === "") {
                e.target.value = 1;
              }
              const newValue = parseInt(e.target.value, 10);
              const currentCount = cartItem.count;

              if (newValue > currentCount) {
                // If the new value is greater, add the difference
                const difference = newValue - currentCount;

                dispatch({
                  type: "add-cart-item",
                  payload: { product: product, quantity: difference }, // Add one item at a time
                });
              } else if (newValue < currentCount) {
                // If the new value is less, remove the difference
                const difference = currentCount - newValue;

                dispatch({
                  type: "remove-cart-item",
                  payload: { product: product, quantity: difference }, // Remove one item at a time
                });
              }
              // If the value is the same, do nothing
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur(); // Remove focus from the input
              }
            }}
            min="0" // Ensure the input doesn't go below 0
          />
          <button
            onClick={() => {
              dispatch({
                type: "add-cart-item",
                payload: { product: product, quantity: 1 },
              });
              inputRef.current.value = cartItem.count + 1;
            }}
          >
            +
          </button>
        </div>
      </div>

      {product.chosenFlavours && (
        <div className="details">
          <h3>{product.chosenFlavours.length > 1 ? "Sabores" : "Sabor"}</h3>
          <ul>
            {product.chosenFlavours.map((flavour) => {
              return <li key={uniqid()}>{flavour}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
