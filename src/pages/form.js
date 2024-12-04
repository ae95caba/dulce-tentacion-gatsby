import "../assets/scss/form.scss";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import cone from "../images/ice-cream-cone.svg";
export default function IceCreamForm({ data, location }) {
  const [isLoading, setIsLoading] = useState(true);
  const [flavourList, setFlavourList] = useState(null);

  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(GlobalContext);
  const allParams = new URLSearchParams(location.search);
  const productIdParam = allParams.get("id");
  const products = data.allProduct.edges;
  const [choosenFlavours, setChoosenFlavours] = useState([]);

  const maxSelections = product && (product.flavours || 1);

  //get product from param to fetch corresponding options
  useEffect(() => {
    const foundProduct = products.find((product) => {
      return product.node._id === productIdParam;
    });

    setProduct(foundProduct.node);
  }, []);

  //fetch options from api
  useEffect(() => {
    if (product) {
      async function setFlavoursState() {
        async function fetchFlavors() {
          const requestOptions = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
            const apiUrl = process.env.GATSBY_API_URL;

            const response = await fetch(
              `${apiUrl}/${product.apiRoute}`,
              requestOptions
            );

            if (!response.ok) {
              throw new Error("Request failed");
            }

            const flavours = await response.json();

            const availableFlavours = flavours
              .filter((obj) => obj.outOfStock === false)
              .map((obj) => obj.name);
            return availableFlavours;

            // Process the data or perform other operations
          } catch (error) {
            console.log(error);
          }
        }
        const flavours = await fetchFlavors();
        setFlavourList(flavours);
      }

      setFlavoursState();
    }
  }, [product]);

  //after fetching the option stop loading animation
  useEffect(() => {
    if (flavourList) {
      setIsLoading(false);
    }
  }, [flavourList]);

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
    const buttonSubmitter = e.nativeEvent.submitter;
    const buttonName = buttonSubmitter.name;
    if (choosenFlavours.length > 0) {
      dispatch({
        type: "add-cart-item",
        payload: {
          id: product._id,
          product: { ...product, choosenFlavours },
        },
      });
      if (buttonName == "go to cart") {
        navigate("/carrito");
      } else {
        navigate("/catalogo");
      }
    } else {
      Swal.fire(
        `Elige por lo menos un sabor`,
        "O es que queres un pote vacio ? :V",
        "warning"
      );
    }
  }

  return (
    <main id="ice-cream-list">
      {isLoading ? (
        <div className="loader-container">
          <img src={cone} className="loader" />
          <p>Cargando</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {<h1>{product.name} 🍨</h1>}
          {product.description && <h2>{product.description}</h2>}
          <h3>
            Sabores
            {<span>{` ${choosenFlavours.length}/${maxSelections}`}</span>}
          </h3>
          <div className="container">
            {flavourList.map((flavourValue) => (
              <label key={flavourValue} htmlFor={flavourValue}>
                <span>{flavourValue}</span>

                <input
                  id={flavourValue}
                  type="checkbox"
                  disabled={
                    !choosenFlavours.includes(flavourValue) &&
                    choosenFlavours.length >= maxSelections
                  }
                  name="flavour"
                  value={flavourValue}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>

          <button name="go to cart">Comprar ahora</button>
          <button name="go to catalog">Agregar al carrito</button>
        </form>
      )}
    </main>
  );
}

export const query = graphql`
  query MyQueryTwo {
    allProduct {
      edges {
        node {
          price
          localImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          outOfStock
          name
          description
          imgUrl
          _id
          flavours
          apiRoute
        }
      }
    }
  }
`;
