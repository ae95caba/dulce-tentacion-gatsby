import React from "react";

import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function SummarySection({
  deliveryInfo,
  getTotalPrice,
  getDeliveryPrice,
  getAllIceCreamDiscounts,
}) {
  const { getTotalItemsPrice } = useContext(GlobalContext);

  return (
    <section className="summary">
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
        {getAllIceCreamDiscounts().length > 0 &&
          getAllIceCreamDiscounts().map((discount) => (
            <p>
              {discount.name} <span>- ${discount.ammount}</span>
            </p>
          ))}
        <p>
          Total a pagar:
          <span>${getTotalPrice()}</span>
        </p>
      </div>
    </section>
  );
}
