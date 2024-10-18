import React, { useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { CartBanner } from "../components/Images/Banners";
import { useContext } from "react";
import { navigate } from "gatsby";
import Swal from "sweetalert2";
import { createWhatsAppLink } from "../logic/whatsappLink";
import AnimeGirldThinking from "../components/Images/AnimeGirlThinking";
import CartItem from "../components/CartItem";
import SummarySection from "../components/SummarySection";
import DeliverySection from "../components/DeliverySection";
import { BannerSection } from "../components/BannerSection";
import SadShoppingCart from "../components/Images/SadShoppingCart";
import { FaCopy } from "react-icons/fa";
import { TbCopyCheckFilled } from "react-icons/tb";
export default function Cart() {
  const { dispatch, cartItems, getTotalItemsPrice } = useContext(GlobalContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [textCopied, setTextCopied] = useState(false);

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
    return getTotalItemsPrice() - getTotalDiscountAmmount();
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
        totalItemsPrice: getTotalItemsPrice(),
        totalPrice: getTotalPrice(),
        totalDiscountAmmount: getTotalDiscountAmmount(),
      };

      const whatsappLink = createWhatsAppLink(messageData);

      window.open(whatsappLink, "_blank");

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
      console.log("Copied to clipboard: " + text); // Optional: Show a confirmation
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  ///////////////////////////
  return (
    <main id="cart">
      <div className="content">
        <BannerSection
          h2="Aca podes completar tu pedido"
          h1="Carrito"
          GatsbyImage={CartBanner}
        />

        {cartItems.length > 0 ? (
          <>
            <div className="container">
              <section className="cart-items">
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
                <DeliverySection
                  handleSubmit={handleSubmit}
                  deliveryInfo={deliveryInfo}
                  setDeliveryInfo={setDeliveryInfo}
                />
                <SummarySection
                  deliveryInfo={deliveryInfo}
                  getTotalPrice={getTotalPrice}
                  getAllIceCreamDiscounts={getAllIceCreamDiscounts}
                />
                <section className="payment options">
                  <label className="option">
                    <span>Efectivo</span>
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

                  <label className="option">
                    <span>Transferencia</span>
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
                    <p
                      className="alias"
                      onClick={() => copyToClipboard(process.env.GATSBY_ALIAS)}
                    >
                      Alias : <span>{process.env.GATSBY_ALIAS}</span>
                      {textCopied ? (
                        <TbCopyCheckFilled size={"1.3rem"} />
                      ) : (
                        <FaCopy size={"1.3rem"} />
                      )}
                    </p>
                  )}
                </section>
                <button type="submit" form="checkout-form">
                  Comprar
                </button>
              </form>
            </div>
            <p className="info">
              Al precionar "Comprar", se abrira un chat de whatsapp con toda la
              info de tu pedido pre-cargado, solo deberas enviarlo y nosotros
              haremos el resto 😉
            </p>
          </>
        ) : (
          <div className="empty">
            <SadShoppingCart />
            <p>No hay nada aca, porque no agregas algo?</p>
            <AnimeGirldThinking />
          </div>
        )}
      </div>
    </main>
  );
}
