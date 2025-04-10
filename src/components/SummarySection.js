import React from "react";

import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function SummarySection({
  getTotalCartPriceWithDiscount,

  getAllIceCreamDiscounts,
}) {
  const { getTotalCartPriceWithoutDiscount } = useContext(GlobalContext);
  console.log(JSON.stringify(getAllIceCreamDiscounts()));
  return (
    <section className="summary">
      <h3>Detalle: </h3>

      <div className="container">
        {getTotalCartPriceWithDiscount() !==
          getTotalCartPriceWithoutDiscount() && (
          <p>
            Productos: <span>$ {getTotalCartPriceWithoutDiscount()}</span>
          </p>
        )}

        {getAllIceCreamDiscounts().length > 0 &&
          getAllIceCreamDiscounts().map((discount, index) => (
            <p key={index}>
              {discount.name} <span>- ${discount.amount}</span>
            </p>
          ))}
        <p>
          Total a pagar:
          <span>${getTotalCartPriceWithDiscount()}</span>
        </p>
      </div>
    </section>
  );
}
