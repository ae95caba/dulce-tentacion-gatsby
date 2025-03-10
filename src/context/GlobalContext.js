import React, { createContext, useState, useEffect, useReducer } from "react";

import { toast } from "react-toastify";

export const GlobalContext = createContext({
  ACTIONS: {},
  dispatch: () => {},
  cartItems: [],
});

export function triggerAlert(message) {
  const MultiLineToast = () => (
    <div>
      <div>{message}</div>
    </div>
  );
  toast.success(<MultiLineToast />, {
    position: "top-left",
    autoClose: 2500,
    hideProgressBar: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

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
    let quantity;

    if (action.payload && action.payload.product) {
      product = action.payload.product;
      quantity = action.payload.quantity;
      // Helper function to check if two arrays contain the same elements (ignoring order)
      function areArraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();
        return sortedArr1.every((value, index) => value === sortedArr2[index]);
      }
      isProductInCart = () => {
        return cartItems.some((cartItem) => {
          if (product.choosenFlavours && cartItem.product.choosenFlavours) {
            // Check if both _id matches and choosenFlavours contain the same elements
            return (
              product._id === cartItem.product._id &&
              areArraysEqual(
                product.choosenFlavours,
                cartItem.product.choosenFlavours
              )
            );
          }
          // Check only _id if choosenFlavours is not present
          return product._id === cartItem.product._id;
        });
      };

      indexOfProductInCart = () => {
        return cartItems.findIndex((cartItem) => {
          if (product.choosenFlavours && cartItem.product.choosenFlavours) {
            // Check both _id and choosenFlavours
            return (
              product._id === cartItem.product._id &&
              areArraysEqual(
                product.choosenFlavours,
                cartItem.product.choosenFlavours
              )
            );
          }
          // Check only _id if choosenFlavours is not present
          return product._id === cartItem.product._id;
        });
      };
    }

    const cartItemsCopy = [...cartItems];

    switch (action.type) {
      case "add-cart-item": {
        //function to create a new item on the cart (a stack)
        function newCartItem(product) {
          return {
            product,
            count: 1,
            getTotalPrice() {
              return this.product.price * this.count;
            },
          };
        }
        const message =
          quantity > 1
            ? `${quantity} productos agregados →`
            : "Producto agregado →";
        triggerAlert(message);

        if (!isProductInCart()) {
          //create 1 instance of the product in the cart
          cartItemsCopy.push(newCartItem(product));

          return cartItemsCopy;
        } else {
          //increase the count of the item

          cartItemsCopy[indexOfProductInCart()].count += quantity;

          return cartItemsCopy;
        }
      }
      case "remove-cart-item": {
        if (cartItems[indexOfProductInCart()].count > 1) {
          cartItemsCopy[indexOfProductInCart()].count -= quantity;
          return cartItemsCopy;
        } else {
          cartItemsCopy.splice(indexOfProductInCart(), 1);
          return cartItemsCopy;
        }
      }
      case "remove-stack": {
        cartItemsCopy.splice(indexOfProductInCart(), 1);
        return cartItemsCopy;
      }
      case "reset": {
        return [];
      }
    }
  }

  function getTotalItemsPrice() {
    let total = 0;

    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].getTotalPrice();
    }
    return total;
  }

  return (
    <GlobalContext.Provider
      value={{ getTotalItemsPrice, cartItems, dispatch, ACTIONS }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
