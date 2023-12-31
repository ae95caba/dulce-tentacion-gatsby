import React, { createContext, useState, useEffect, useReducer } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const GlobalContext = createContext({
  ACTIONS: {},
  dispatch: () => {},
  cartItems: [],
});

export default function GlobalContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(reducer, []);

  function triggerAlert(product) {
    /*    Swal.fire(
      `${product.name} agregado al carrito`,
      "Ve al carrito para finalizar tu compra",
      "success"
    ); */

    const MultiLineToast = () => (
      <div>
        <div>Producto agregado al carrito &rarr;</div>
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
        function newCartItem(product) {
          return {
            product,
            count: 1,
            getTotalPrice() {
              return this.product.price * this.count;
            },
          };
        }
        triggerAlert(product);
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
