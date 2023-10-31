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

  //fetch catalog from api
  useEffect(() => {
    const MAX_REFRESHES = 3; // Maximum number of refresh attempts
    const REFRESH_DELAY = 1000; // Delay in milliseconds before each refresh
    let refreshCount = 0;

    async function fetchFlavorsAndSetState() {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const apiUrl = process.env.GATSBY_API_URL;

        const response = await fetch(`${apiUrl}/flavours`, requestOptions);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const flavours = await response.json();

        const availableFlavours = flavours
          .filter((obj) => obj.outOfStock === false)
          .map((obj) => obj.name);
        console.log(availableFlavours);
        setFlavourList(availableFlavours);

        // Process the data or perform other operations
      } catch (error) {
        if (refreshCount < MAX_REFRESHES) {
          refreshCount++;
          setTimeout(() => {
            window.location.reload();
          }, REFRESH_DELAY);
        } else {
          // Handle the maximum refresh attempts reached
          console.log(
            "Maximum refresh attempts reached. Please try again later."
          );
          alert("Estamos teniendo problemas. Por favor intenta mas tarde");
        }
      }
    }
    fetchFlavorsAndSetState();
  }, []);

  useEffect(() => {
    if (flavourList) {
      setIsLoading(false);
    }
  }, [flavourList]);

  useEffect(() => {
    const foundProduct = products.find((product) => {
      return product.node._id === productIdParam;
    });

    setProduct(foundProduct.node);
  }, []);

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
          {<h1>{product.name}</h1>}
          <h3>
            Sabores
            {<span>{` ${choosenFlavours.length}/${product.flavours}`}</span>}
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
                    choosenFlavours.length >= product.flavours
                  }
                  name="flavour"
                  value={flavourValue}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>

          <button>Aceptar</button>
        </form>
      )}
    </main>
  );
}

export const query = graphql`
  query MyQuery {
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
          imgUrl
          _id
          flavours
        }
      }
    }
  }
`;
