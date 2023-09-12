import React, { createContext, useState, useEffect, useReducer } from "react";

export const GlobalContext =
  createContext(/* {
  products: [],
  cartItems: [],
  addToCart: () => {},
} */);

export default function GlobalContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState(null);

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
      isIceCream = product.hasOwnProperty("flavours");
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

        if (isIceCream || (!isIceCream && !isProductInCart)) {
          cartItemsCopy.push(newCartItem(product));
          return cartItemsCopy;
        } else {
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

  //fetch catalog from api
  useEffect(() => {
    const MAX_REFRESHES = 3; // Maximum number of refresh attempts
    const REFRESH_DELAY = 1000; // Delay in milliseconds before each refresh
    let refreshCount = 0;

    async function fetchProductsAndFlavorsAndSetState() {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const apiUrl = "http://localhost:3000";
        console.log(apiUrl);
        const productResponse = await fetch(
          `${apiUrl}/products`,
          requestOptions
        );
        const flavorsResponse = await fetch(
          `${apiUrl}/flavours`,
          requestOptions
        );

        if (!productResponse.ok || !flavorsResponse.ok) {
          throw new Error("Request failed");
        }

        const products = await productResponse.json();
        const flavours = await flavorsResponse.json();

        const availableFlavours = flavours
          .filter((obj) => obj.outOfStock === false)
          .map((obj) => obj.name);

        setCatalog((prev) => ({
          ...prev,
          iceCream: [...products],
          flavoursList: [...availableFlavours],
        }));

        // Process the data or perform other operations
      } catch (error) {
        if (refreshCount < MAX_REFRESHES) {
          refreshCount++;
          setTimeout(() => {
            window.location.reload();
          }, REFRESH_DELAY);
        } else {
          // Handle the maximum refresh attempts reached
          console.log(
            "Maximum refresh attempts reached. Please try again later."
          );
          alert("Estamos teniendo problemas. Por favor intenta mas tarde");
        }
      }
    }
    fetchProductsAndFlavorsAndSetState();
  }, []);

  useEffect(() => {
    if (typeof catalog === "object" && catalog !== null) {
      setIsLoading(false);
    }
  }, [catalog]);

  return (
    <GlobalContext.Provider
      value={{ catalog, cartItems, dispatch, ACTIONS, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
