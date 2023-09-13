import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { Link } from "gatsby";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";
import { navigate } from "gatsby";
import Swal from "sweetalert2";
export default function IceCreamForm({ location }) {
  const modalRef = useRef(null);
  const [product, setProduct] = useState(null);
  const { catalog, dispatch, cartItems, ACTIONS, isLoading } =
    useContext(GlobalContext);
  const allParams = new URLSearchParams(location.search);
  const productId = allParams.get("id");

  useEffect(() => {
    if (!isLoading) {
      setProduct(catalog.iceCream.find((obj) => obj._id === productId));
      console.log(`product is ${JSON.stringify(product)}`);
    }
  }, [isLoading]);

  const [choosenFlavours, setChoosenFlavours] = useState([]);

  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setChoosenFlavours((prev) => [...prev, value]);
    } else {
      const index = choosenFlavours.indexOf(value);
      const copy = choosenFlavours;
      copy.splice(index, 1);

      setChoosenFlavours([...copy]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (choosenFlavours.length > 0) {
      dispatch({
        type: "add-cart-item",
        payload: {
          id: product._id,
          product: { ...product, flavours: choosenFlavours },
        },
      });
      navigate("/catalogo");
      Swal.fire(
        `${product.name} agregado al carrito`,
        "Ve al carrito para finalizar tu compra",
        "success"
      );
    } else {
      modalRef.current.showModal();
    }
  }

  return (
    <main id="ice-cream-list">
      {isLoading ? (
        "Cargando"
      ) : (
        <form onSubmit={handleSubmit}>
          {<h1>{product?.name}</h1>}
          <h3>
            Sabores
            {<span>{` ${choosenFlavours?.length}/${product?.flavours}`}</span>}
          </h3>
          <div className="container">
            {catalog?.flavoursList.map((flavourValue) => (
              <label key={flavourValue} htmlFor={flavourValue}>
                <span>{flavourValue}</span>

                <input
                  id={flavourValue}
                  type="checkbox"
                  disabled={
                    !choosenFlavours.includes(flavourValue) &&
                    choosenFlavours.length >= product?.flavours
                  }
                  name="flavour"
                  value={flavourValue}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>

          <dialog ref={modalRef}>
            <p>Debes elegir por lo menos un sabor</p>
            <button
              type="button"
              onClick={() => {
                modalRef.current.close();
              }}
            >
              Ok
            </button>
          </dialog>

          <button>Aceptar</button>
        </form>
      )}
    </main>
  );
}
