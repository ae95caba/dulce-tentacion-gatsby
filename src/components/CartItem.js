import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import { GlobalContext } from "../context/GlobalContext";
import recycleBin from "../images/recycle-bin.png";
import { useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import DetailsSection from "./DetailsSection";
import { SharedCardDescription } from "./SharedCardSections";
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
      <div className="image-container">
        <GatsbyImage image={image} alt={product.name} />
      </div>
      {!product.chosenFlavours && (
        <SharedCardDescription product={product} units={cartItem.count} />
      )}
      {product.chosenFlavours && (
        <DetailsSection
          product={product}
          rocklets={{
            price: product.addOns.rocklets.price,
            included: product.addOns.rocklets.included,
          }}
          priceWithAddOns={product.priceWithAddOns}
          sauces={{
            price: product.addOns.sauces.price,
            chosenSauces: product.addOns.sauces.chosenSauces,
          }}
          chosenFlavours={product.chosenFlavours}
        />
      )}
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
            if (e.target.value === "") {
              e.target.value = 1;
            }
            const newValue = parseInt(e.target.value, 10);
            const currentCount = cartItem.count;

            if (newValue > currentCount) {
              const difference = newValue - currentCount;
              dispatch({
                type: "add-cart-item",
                payload: { product: product, quantity: difference },
              });
            } else if (newValue < currentCount) {
              const difference = currentCount - newValue;
              dispatch({
                type: "remove-cart-item",
                payload: { product: product, quantity: difference },
              });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          min="0"
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
  );
}
