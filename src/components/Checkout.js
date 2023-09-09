import React, { useEffect, useState, useRef } from "react";
import { priceFromBarrio } from "../logic/barrios";
export default function Checkout({ deliveryInfo }) {
  function getDeliveryPrice() {
    if (deliveryInfo.neighborhood && deliveryInfo.isChecked) {
      return priceFromBarrio(deliveryInfo.neighborhood);
    } else {
      return 0;
    }
  }

  function getTotalItemsPrice() {
    return 0;
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
          <span>$ {getDeliveryPrice()}</span>
        </p>
        <p>
          Total a pagar:
          <span>${getTotalItemsPrice() + getDeliveryPrice()}</span>
        </p>
      </div>

      <button type="submit" form="delivery-form">
        Comprar
      </button>
    </section>
  );
}
