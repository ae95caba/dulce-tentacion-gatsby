import React, { useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Swal from "sweetalert2";
import { useContext } from "react";
import { link } from "../logic/whatsappLink";

import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
import DeliveryForm from "../components/DeliveryForm";
export default function Cart() {
  const { catalog, dispatch, cartItems, ACTIONS, isLoading } =
    useContext(GlobalContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  //get deliveryInfo from localStorage if there is any
  //and populate form with it
  useEffect(() => {
    let deliveryInfoString = localStorage.getItem("deliveryInfo");
    console.log(JSON.stringify(deliveryInfo));
    if (deliveryInfoString) {
      const deliveryInfo = JSON.parse(deliveryInfoString);

      setDeliveryInfo({ ...deliveryInfo });
    }
  }, []);

  //add deliveryInfo to localStorage on every state update
  useEffect(() => {
    //save  deliveryInfo to local storage
    if (Object.keys(deliveryInfo).length > 0) {
      console.log(JSON.stringify(deliveryInfo));
      const deliveryInfoString = JSON.stringify(deliveryInfo);
      localStorage.setItem("deliveryInfo", deliveryInfoString);
    }

    ///////////////////////////
  }, [deliveryInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      window.open(
        link(
          cartItems,
          deliveryInfo

          //make a function that calculates the price of all the items in the cart
        ),
        "_blank"
      );

      dispatch({ type: "reset" });

      Swal.fire(
        `Gracias`,
        "Continua con tu conmpra en el siguiente chat",
        "success"
      );
    } else {
      const formElements = e.target.elements;

      for (const element of formElements) {
        e.target.reportValidity();
      }
    }
  }

  ///////////////////////////
  return (
    <main id="cart">
      <div className="content">
        <h1>Tu carrito</h1>
        {cartItems.length > 0 ? (
          <>
            <section className="cart-items">
              {cartItems.map((cartItem, index) => {
                return (
                  <CartItem cartItem={cartItem} key={`cart-item-${index}`} />
                );
              })}
            </section>
            <DeliveryForm
              handleSubmit={handleSubmit}
              deliveryInfo={deliveryInfo}
              setDeliveryInfo={setDeliveryInfo}
            />
            <Checkout deliveryInfo={deliveryInfo} />
          </>
        ) : (
          <p id="empty">No hay nada aca, porque no agregas algo?</p>
        )}
      </div>
    </main>
  );
}
