import React from "react";

export default function ProductCard({ isCart }) {
  return (
    <div className="cart-item">
      isCart && (
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
      )
      <div className="left ">
        <GatsbyImage image={image} alt={product.name} />
      </div>
      {!product.chosenFlavours && (
        <div className="right">
          <div className="description">
            <p className="name">{product.name}</p>
            <p className="price">$ {product.price}</p>
            <p className="description-string">
              {formatDescription(capitalizeFirstLetter(product.description))}
            </p>
          </div>
        </div>
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
      {cartItem.count > 1 && (
        <p className="subtotal">Subtotal: $ {cartItem.getTotalPrice()}</p>
      )}
    </div>
  );
}
