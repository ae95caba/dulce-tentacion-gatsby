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

  function getDiscounts() {
    function getDiscountsOf_(name) {
      function getCountOf_(name) {
        let count = 0;
        cartItems.forEach((item) => {
          if (item.product.name === name) {
            count++;
          }
        });
        return count;
      }

      function getAmount() {
        let amount = 0;
        switch (name) {
          case "1 kg":
            amount = 300;
            break;
          case "1/2 kg":
            amount = 200;
            break;
          case "1/4 kg":
            amount = 200;
            break;
          default:
            break;
        }
        return amount;
      }

      let disccounts = [];
      const pairOfMedios = Math.floor(getCountOf_(name) / 2);
      for (let index = 0; index < pairOfMedios; index++) {
        disccounts.push({ name: `Combo 2 x ${name}`, ammount: getAmount() });
      }
      return disccounts;
    }

    const products = ["1/2 kg", "1 kg", "1/4 kg"];
    let discounts = [];
    products.forEach((product) => {
      discounts.push(...getDiscountsOf_(product));
    });
    return discounts;
  }

  function getTotalDiscountAmmount() {
    let total = 0;
    getDiscounts().forEach((discount) => {
      total += discount.ammount;
    });
    return total;
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
        {/*  <button
          onClick={() => {
            console.log(getDiscounts());
            console.log(`total discount : ${getTotalDiscountAmmount()}`);
          }}
        >
          Log
        </button> */}
      </div>
    </main>
  );
}
