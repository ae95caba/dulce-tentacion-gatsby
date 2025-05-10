import "../assets/scss/carrito.scss";
import React, { useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";

import Swal from "sweetalert2";
import { createWhatsAppLink } from "../logic/whatsappLink";

import CartItem from "../components/CartItem";
import SummarySection from "../components/SummarySection";
import DeliverySection from "../components/DeliverySection";
import { BannerSection } from "../components/BannerSection";

import { FaCopy } from "react-icons/fa";
import { TbCopyCheckFilled } from "react-icons/tb";

import { triggerAlert } from "../context/GlobalContext";
import { StaticImage } from "gatsby-plugin-image";
export default function Cart() {
  const { dispatch, cartItems, getTotalCartPriceWithoutDiscount } =
    useContext(GlobalContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [textCopied, setTextCopied] = useState(false);

  function getAllIceCreamDiscounts() {
    function countFlavourAppearances(flavour) {
      const count = cartItems.reduce((acc, item) => {
        if (item.product.flavours === flavour) {
          return acc + item.count; // Add the count of this item to the accumulator
        }
        return acc; // Return the accumulator unchanged if the flavour doesn't match
      }, 0);
      console.log(`Flavour: ${flavour}, Total Appearances: ${count}`); // Log the flavour and its total count
      return count;
    }

    function getDiscountAmount(flavourCount) {
      const discountMap = {
        2: 300,
        3: 500,
      };
      const amount = discountMap[flavourCount] || 0; // Return 0 if no discount
      console.log(`Flavour Count: ${flavourCount}, Discount Amount: ${amount}`); // Log the flavour count and discount amount
      return amount;
    }

    function getIceCreamName(flavourCount) {
      const flavourNames = {
        2: "1/4 kg",
        3: "1/2 kg",
      };
      const name = flavourNames[flavourCount] || ""; // Return empty string if no match
      console.log(`Flavour Count: ${flavourCount}, Ice Cream Name: ${name}`); // Log the flavour count and ice cream name
      return name;
    }

    function calculateDiscountsForFlavour(flavourCount) {
      const appearances = countFlavourAppearances(flavourCount);
      const numberOfCombos = Math.floor(appearances / 2);
      const discountAmount = getDiscountAmount(flavourCount);
      const iceCreamName = getIceCreamName(flavourCount);

      console.log(
        `Calculating Discounts for Flavour Count: ${flavourCount}, Appearances: ${appearances}, Number of Combos: ${numberOfCombos}`
      ); // Log the number of combos

      return Array.from({ length: numberOfCombos }, () => ({
        name: `Descuento 2u ${iceCreamName}`,
        amount: discountAmount,
      }));
    }

    const discounts = [];
    for (let flavourCount = 2; flavourCount <= 3; flavourCount++) {
      discounts.push(...calculateDiscountsForFlavour(flavourCount));
    }

    console.log(`Final Discounts:`, discounts); // Log the final discounts array
    return discounts;
  }

  function getTotalDiscountAmmount() {
    let total = 0;
    getAllIceCreamDiscounts().forEach((discount) => {
      total += discount.amount;
    });
    return total;
  }

  function getTotalCartPriceWithDiscount() {
    return getTotalCartPriceWithoutDiscount() - getTotalDiscountAmmount();
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
      console.log(paymentMethod);
      const messageData = {
        cartItems,
        paymentMethod,
        deliveryInfo,
        totalCartPriceWithoutDiscount: getTotalCartPriceWithoutDiscount(),
        totalCartPriceWithDiscount: getTotalCartPriceWithDiscount(),
        totalDiscountAmmount: getTotalDiscountAmmount(),
      };

      const whatsappLink = createWhatsAppLink(messageData);

      window.location.href = whatsappLink; // Redirige directamente en móviles

      Swal.fire({
        title: "Gracias!💗",
        html: `En caso de no haberse enviado el mensaje con tu pedido reinténtalo <a href="${whatsappLink}" target="_blank">ACA</a>.`,
        icon: "info",
        confirmButtonText: "OK",
      }).then((result) => {
        dispatch({ type: "reset" });

        window.scrollTo(0, 0);
      });
    } else {
      const formElements = e.target.elements;

      for (const element of formElements) {
        e.target.reportValidity();
      }
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setTextCopied(true);
      triggerAlert("Alias copiado al portapapeles");
      console.log("Copied to clipboard: " + text); // Optional: Show a confirmation
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  ///////////////////////////
  return (
    <main id="cart">
      <div className="content">
        <BannerSection h2="Aca podes completar tu pedido" h1="Carrito">
          <StaticImage src="../images/cart-banner.jpg" />
        </BannerSection>

        {cartItems.length > 0 ? (
          <>
            <div className="container">
              <section className="product-cards">
                {cartItems.map((cartItem, index) => {
                  return (
                    <CartItem cartItem={cartItem} key={`cart-item-${index}`} />
                  );
                })}
              </section>
              <form
                noValidate
                id="checkout-form"
                autoComplete="on"
                onSubmit={(e) => handleSubmit(e)}
              >
                {cartItems.length > 1 && (
                  <SummarySection
                    isDeliveryChecked={deliveryInfo.isChecked}
                    getTotalCartPriceWithDiscount={
                      getTotalCartPriceWithDiscount
                    }
                    getAllIceCreamDiscounts={getAllIceCreamDiscounts}
                  />
                )}
                <DeliverySection
                  handleSubmit={handleSubmit}
                  deliveryInfo={deliveryInfo}
                  setDeliveryInfo={setDeliveryInfo}
                />

                <section className="payment options">
                  <label
                    className={`option ${
                      paymentMethod === "cash" && "checked"
                    }`}
                  >
                    <span>Efectivo 💸</span>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      required
                      onClick={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                    />
                  </label>

                  <label
                    className={`option ${
                      paymentMethod === "transfer" && "checked"
                    }`}
                  >
                    <span>Transferencia 📱</span>
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      required
                      onClick={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                    />
                  </label>
                  {paymentMethod === "transfer" && (
                    <>
                      <p
                        className="alias"
                        onClick={() =>
                          copyToClipboard(process.env.GATSBY_ALIAS)
                        }
                      >
                        Alias :{" "}
                        <span style={{ color: "blue" }}>
                          {process.env.GATSBY_ALIAS}
                        </span>
                        {textCopied ? (
                          <TbCopyCheckFilled size={"1.3rem"} />
                        ) : (
                          <FaCopy size={"1.3rem"} />
                        )}
                      </p>
                      <p className="titular">
                        Titular:
                        <span>{process.env.GATSBY_OWNER}</span>
                      </p>
                    </>
                  )}
                </section>

                <button type="submit" form="checkout-form">
                  Finalizar
                </button>
              </form>
            </div>
            <p className="info">
              Al precionar "Finalizar", se abrira un chat de whatsapp con toda
              la info de tu pedido pre-cargada, solo deberas enviarla y nosotros
              haremos el resto 😉
            </p>
          </>
        ) : (
          <div className="empty">
            <StaticImage
              src="../images/sad-shopping-cart.png"
              alt="Logo"
              placeholder="blurred"
              class="sad-shopping-cart"
            />
            <p>No hay nada aca, porque no agregas algo?</p>
            <StaticImage
              src="../images/anime-girl-thinking.png"
              placeholder="blurred"
            />
          </div>
        )}
      </div>
    </main>
  );
}
