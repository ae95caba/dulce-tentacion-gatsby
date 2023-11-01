import React, { useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
import { createWhatsAppLink } from "../logic/whatsappLink";
import questionMark from "../images/question-mark.svg";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
import DeliveryForm from "../components/DeliveryForm";
export default function Cart() {
  const { dispatch, cartItems, getTotalItemsPrice } = useContext(GlobalContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  function getDeliveryPrice() {
    return deliveryInfo.isChecked && deliveryInfo.price
      ? deliveryInfo.price
      : 0;
  }

  function getDiscount() {
    return 0;
  }

  function getTotalPrice() {
    return getTotalItemsPrice() + getDeliveryPrice();
  }

  //get deliveryInfo from localStorage if there is any
  //and populate form with it
  useEffect(() => {
    let deliveryInfoString = localStorage.getItem("deliveryInfo");

    if (deliveryInfoString) {
      const deliveryInfo = JSON.parse(deliveryInfoString);

      setDeliveryInfo({ ...deliveryInfo });
    }
  }, []);

  //add deliveryInfo to localStorage on every state update
  useEffect(() => {
    //save  deliveryInfo to local storage
    if (Object.keys(deliveryInfo).length > 0) {
      const deliveryInfoString = JSON.stringify(deliveryInfo);
      localStorage.setItem("deliveryInfo", deliveryInfoString);
    }

    ///////////////////////////
  }, [deliveryInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const messageData = {
        cartItems,
        deliveryInfo,
        totalItemsPrice: getTotalItemsPrice(),
        totalPrice: getTotalPrice(),
      };

      const whatsappLink = createWhatsAppLink(messageData);

      window.open(whatsappLink, "_blank");

      dispatch({ type: "reset" });
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
            <Checkout
              deliveryInfo={deliveryInfo}
              getDeliveryPrice={getDeliveryPrice}
              getTotalPrice={getTotalPrice}
            />
          </>
        ) : (
          <>
            <img className="question" src={questionMark} />
            <p id="empty">No hay nada aca, porque no agregas algo?</p>
          </>
        )}
      </div>
    </main>
  );
}
