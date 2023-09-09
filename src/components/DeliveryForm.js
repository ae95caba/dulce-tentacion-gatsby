import React, { useEffect, useState, useRef } from "react";
import { options } from "../logic/barrios";
export default function DeliveryForm({
  handleSubmit,
  setDeliveryInfo,
  deliveryInfo,
}) {
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
    <form
      noValidate
      id="delivery-form"
      autoComplete="on"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="options">
        <label className="option" htmlFor="pickup">
          <span>Retiro en el local</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="pickup"
            id="pickup"
            onChange={() =>
              setDeliveryInfo((prev) => ({ ...prev, isChecked: false }))
            }
            checked={!deliveryInfo.isChecked}
            required
          />
        </label>

        <label className="option" htmlFor="delivery">
          <span>Envio a domicilio</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="delivery"
            id="delivery"
            checked={deliveryInfo.isChecked}
            onChange={() => {
              setDeliveryInfo((prev) => ({ ...prev, isChecked: true }));
            }}
            required
          />
        </label>
      </div>

      {deliveryInfo.isChecked && (
        <div id="delivery-info">
          <div className="container">
            <select
              name="Barrio"
              value={deliveryInfo.neighborhood}
              required
              onChange={(e) => {
                const selectedValue = e.target.value;
                setDeliveryInfo((prev) => ({
                  ...prev,
                  neighborhood: selectedValue,
                }));
              }}
            >
              <option value="" disabled selected>
                Elige un barrio *
              </option>
              {options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>

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
    </form>
  );
}
