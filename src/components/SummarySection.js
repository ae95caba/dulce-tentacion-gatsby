import React from "react";

import { GlobalContext } from "../context/GlobalContext";

import { useContext } from "react";
export default function SummarySection({
  getTotalCartPriceWithDiscount,
  isDeliveryChecked,
  getAllIceCreamDiscounts,
}) {
  const { getTotalCartPriceWithoutDiscount } = useContext(GlobalContext);
  console.log(JSON.stringify(getAllIceCreamDiscounts()));
  const noDisccount =
    getTotalCartPriceWithDiscount() == getTotalCartPriceWithoutDiscount();
  return (
    <section className="summary">
      <h3>{noDisccount ? "Total del carrito" : "Detalle:"} </h3>

      <div className="container">
        {!noDisccount && (
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
        {/* Step 2: Conditional rendering based on isDeliveryChecked */}

        {noDisccount ? (
          <h3>$ {getTotalCartPriceWithoutDiscount()}</h3>
        ) : (
          <p>
            Total del carrito:
            <span>${getTotalCartPriceWithDiscount()}</span>
          </p>
        )}

        {/* {isDeliveryChecked && (
          <p>
            Delivery: <span>preguntar</span>
          </p> // You can customize this message as needed
        )} */}
      </div>
    </section>
  );
}
