import React, { createContext, useState, useEffect, useReducer } from "react";

export const GlobalContext = createContext({
  ACTIONS: {},
  dispatch: () => {},
  cartItems: [],
});

export default function GlobalContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(reducer, []);

  const ACTIONS = {
    ADD_CART_ITEM: "add-cart-item",
    REMOVE_CART_ITEM: "remove-cart-item",
  };

  function reducer(cartItems, action) {
    let product;
    let indexOfProductInCart;
    let isProductInCart;
    let isIceCream;
    if (action.payload && action.payload.product) {
      product = action.payload.product;
      indexOfProductInCart = cartItems.findIndex((obj) => {
        return obj.product._id === product._id;
      });
      isProductInCart = indexOfProductInCart >= 0;
      isIceCream = product.flavours !== null;
    }

    const cartItemsCopy = [...cartItems];

    switch (action.type) {
      case "add-cart-item": {
        console.log(`add cart item : ${JSON.stringify(product)}`);
        function newCartItem(product) {
          return {
            product,
            count: 1,
            getTotalPrice() {
              return this.product.price * this.count;
            },
          };
        }

        if (isIceCream || (!isIceCream && !isProductInCart)) {
          //create 1 instance of the product in the cart
          cartItemsCopy.push(newCartItem(product));
          return cartItemsCopy;
        } else {
          //increase the count of the item
          cartItemsCopy[indexOfProductInCart].count++;

          return cartItemsCopy;
        }
      }
      case "remove-cart-item": {
        if (cartItems[indexOfProductInCart].count > 1) {
          cartItemsCopy[indexOfProductInCart].count--;
          return cartItemsCopy;
        } else {
          cartItemsCopy.splice(indexOfProductInCart, 1);
          return cartItemsCopy;
        }
      }
      case "remove-stack": {
        cartItemsCopy.splice(indexOfProductInCart, 1);
        return cartItemsCopy;
      }
      case "reset": {
        return [];
      }
    }
  }

  return (
    <GlobalContext.Provider value={{ cartItems, dispatch, ACTIONS }}>
      {children}
    </GlobalContext.Provider>
  );
}
