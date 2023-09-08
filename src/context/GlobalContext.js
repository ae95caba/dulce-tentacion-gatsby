import React, { createContext, useState, useEffect, useReducer } from "react";

export const GlobalContext =
  createContext(/* {
  products: [],
  cartItems: [],
  addToCart: () => {},
} */);

export default function GlobalContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(reducer, {});
  const [catalog, setCatalog] = useState(null);

  const ACTIONS = {
    ADD_CART_ITEM: "add-cart-item",
    REMOVE_CART_ITEM: "remove-cart-item",
  };

  function newCartItem(name) {
    return { id: Date.now(), name: name };
  }

  function reducer(cartItems, action) {
    const itemId = action.payload.id;
    const isItemInCart = cartItems[itemId];
    const cartItemsCopy = structuredClone(cartItems);
    switch (action.type) {
      case "add-cart-item": {
        if (isItemInCart) {
          console.log(`aumentar count`);
          cartItemsCopy[itemId].count++;
          return cartItemsCopy;
        } else {
          console.log(`agregar count property`);
          console.log(`itemid is : ${itemId}`);
          cartItemsCopy[itemId] = { count: 1 };
          return cartItemsCopy;
        }
      }
      case "remove-cart-item": {
        //the item has to be in the cart
        if (cartItems[itemId].count > 1) {
          cartItemsCopy[itemId].count--;
        } else {
          delete cartItemsCopy[itemId];
        }
        return cartItemsCopy;
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
    console.log(catalog);
  }, [catalog]);

  return (
    <GlobalContext.Provider value={{ catalog, cartItems, dispatch, ACTIONS }}>
      {children}
    </GlobalContext.Provider>
  );
}
