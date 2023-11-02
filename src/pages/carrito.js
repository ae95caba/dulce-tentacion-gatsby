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

  function getAllIceCreamDiscounts() {
    function getDiscountsOf_FlavoursIceCream(flavours) {
      function get_FlavourIceCreamAparitions(flavours) {
        let count = 0;
        cartItems.forEach((item) => {
          if (item.product.flavours === flavours) {
            count++;
          }
        });
        return count;
      }

      function getDiscountAmount() {
        let amount = 0;
        switch (flavours) {
          case 4:
            amount = 300;
            break;
          case 3:
            amount = 200;
            break;
          case 2:
            amount = 200;
            break;
          default:
            break;
        }
        return amount;
      }

      function getIceCreamNameFrom_(flavours) {
        let name;
        switch (flavours) {
          case 4:
            name = "1 kg";
            break;
          case 3:
            name = "1/2 kg";
            break;

          case 2:
            name = "1/4 kg";
            break;

          default:
            break;
        }
        return name;
      }

      let disccounts = [];
      const numberOfCombos = Math.floor(
        get_FlavourIceCreamAparitions(flavours) / 2
      );
      for (let index = 0; index < numberOfCombos; index++) {
        disccounts.push({
          name: `Combo 2 x ${getIceCreamNameFrom_(flavours)}`,
          ammount: getDiscountAmount(),
        });
      }
      return disccounts;
    }

    let discounts = [];

    for (let index = 2; index <= 4; index++) {
      discounts.push(...getDiscountsOf_FlavoursIceCream(index));
    }
    return discounts;
  }

  function getTotalDiscountAmmount() {
    let total = 0;
    getAllIceCreamDiscounts().forEach((discount) => {
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
        <button
          onClick={() => {
            console.log(getAllIceCreamDiscounts());
            console.log(`total discount : ${getTotalDiscountAmmount()}`);
          }}
        >
          Log
        </button>
      </div>
    </main>
  );
}
