import React, { useEffect, useState, useRef } from "react";

export default function DeliverySection({ setDeliveryInfo, deliveryInfo }) {
  function checkValidity(e) {
    const isValid = e.target.validity.valid;

    //const checksPassed = checks.filter((check) => validity[check]).length === 0;
    if (!isValid) {
      e.target.classList.add("invalid");
    } else {
      e.target.classList.remove("invalid");
    }
  }

  return (
    <>
      <section className="fullfillment-method options">
        <label
          onClick={() => {
            setDeliveryInfo((prev) => ({ ...prev, isChecked: false }));
          }}
          className="option"
          htmlFor="pickup"
        >
          <span>Retiro en el local</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="pickup"
            defaultChecked={!deliveryInfo.isChecked}
            id="pickup"
            required
          />
        </label>

        <label
          className="option"
          htmlFor="delivery"
          onClick={() => {
            setDeliveryInfo((prev) => ({ ...prev, isChecked: true }));
          }}
        >
          <span>Envio a domicilio</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="delivery"
            defaultChecked={deliveryInfo.isChecked}
            id="delivery"
            required
          />
        </label>
      </section>

      {deliveryInfo.isChecked && (
        <div id="delivery-details">
          <div className="container">
            <input
              placeholder="Barrio *"
              defaultValue={
                deliveryInfo?.neighborhood ? deliveryInfo.neighborhood : ""
              }
              required
              onBlur={checkValidity}
              onChange={(e) => {
                const selectedValue = e.target.value;

                setDeliveryInfo((prev) => ({
                  ...prev,
                  neighborhood: selectedValue,
                }));
              }}
            />

            <div className="error">Seleciona un barrio</div>
          </div>

          <div className="container">
            <input
              type="text"
              placeholder="Direccion *"
              autoComplete="street-address"
              required
              onBlur={checkValidity}
              defaultValue={deliveryInfo.address}
              onChange={(event) => {
                console.log(`is checked is : ${deliveryInfo?.isChecked}`);
                setDeliveryInfo((prev) => ({
                  ...prev,
                  address: event.target.value,
                }));
              }}
            />

            <div className="error">Escribe una direccion</div>
          </div>

          <div className="container">
            <input
              type="text"
              placeholder="Entre calles *"
              required
              onBlur={checkValidity}
              defaultValue={deliveryInfo.crossStreets}
              onChange={(event) =>
                setDeliveryInfo((prev) => ({
                  ...prev,
                  crossStreets: event.target.value,
                }))
              }
            />

            <div className="error">Escribe las entrecalles</div>
          </div>

          <textarea
            id="aditional-info"
            placeholder="Opcional:
                                                          Descripcion de la casa, ejemplo: frente rojo, puerta negra de chapa."
            defaultValue={deliveryInfo.aditionalInfo}
            onChange={(event) =>
              setDeliveryInfo((prev) => ({
                ...prev,
                aditionalInfo: event.target.value,
              }))
            }
          ></textarea>
        </div>
      )}
    </>
  );
}
