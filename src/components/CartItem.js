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
                payload: { product: product },
              });
            }}
          >
            -
          </button>
          <span>{cartItem.count}</span>
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
      </div>

      {product.choosenFlavours && (
        <div className="details">
          <h3>{product.choosenFlavours.length > 1 ? "Sabores" : "Sabor"}</h3>
          <ul>
            {product.choosenFlavours.map((flavour) => {
              return <li key={uniqid()}>{flavour}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
