import React from "react";

import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function Checkout({ deliveryInfo }) {
  const { cartItems } = useContext(GlobalContext);

  function getTotalItemsPrice() {
    let total = 0;

    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].getTotalPrice();
    }
    return total;
  }

  return (
    <section className="checkout">
      <h3>Detalle: </h3>

      <div className="container">
        <p>
          Productos: <span>$ {getTotalItemsPrice()}</span>
        </p>
        <p>
          Envio:
          <span>
            $ {deliveryInfo.price !== undefined ? deliveryInfo.price : "0"}
          </span>
        </p>
        <p>
          Total a pagar:
          <span>
            $
            {getTotalItemsPrice() +
              (deliveryInfo.price !== undefined ? deliveryInfo.price : 0)}
          </span>
        </p>
      </div>

      <button type="submit" form="delivery-form">
        Comprar
      </button>
    </section>
  );
}
