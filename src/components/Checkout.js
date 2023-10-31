import React from "react";

import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function Checkout({
  deliveryInfo,
  getTotalPrice,
  getDeliveryPrice,
}) {
  const { getTotalItemsPrice } = useContext(GlobalContext);

  return (
    <section className="checkout">
      <h3>Detalle: </h3>

      <div className="container">
        <p>
          Productos: <span>$ {getTotalItemsPrice()}</span>
        </p>
        {deliveryInfo.isChecked && (
          <p>
            Envio:
            <span>$ {getDeliveryPrice()}</span>
          </p>
        )}
        <p>
          Total a pagar:
          <span>${getTotalPrice()}</span>
        </p>
      </div>

      <button type="submit" form="delivery-form">
        Comprar
      </button>
    </section>
  );
}
