import "../assets/scss/form.scss";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import chocolatePreview from "../images/chocolate.jpg";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import cone from "../images/ice-cream-cone.svg";
export default function IceCreamForm({ data, location }) {
  const { dispatch } = useContext(GlobalContext);
  const allParams = new URLSearchParams(location.search);
  const productIdParam = allParams.get("id");
  const products = data.allProduct.edges;
  const allFlavours = data.allFlavour.nodes;
  const [choosenFlavours, setChoosenFlavours] = useState([]);

  if (!productIdParam) {
    return <p>Page not found</p>; // Or redirect to a 404 page
  }

  const product = products.find((product) => {
    return product.node._id === productIdParam;
  }).node;

  console.log(
    `-------------------------------------------------------------------------------------`
  );
  console.log(product);
  console.log(
    `-------------------------------------------------------------------------------------`
  );
  const matchingFlavours = allFlavours.filter((flavour) => {
    return flavour.apiRoute === product.apiRoute;
  });
  console.log(JSON.stringify(matchingFlavours));

  const maxSelections = product && (product.flavours || 1);
  //nuevo fin

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
      <form onSubmit={handleSubmit}>
        {<h1>{product.name} 🍨</h1>}
        {product.description && <h2>{product.description}</h2>}
        <h3>
          Sabores
          {<span>{` ${choosenFlavours.length}/${maxSelections}`}</span>}
        </h3>
        <div className="container">
          {matchingFlavours
            .filter((flavour) => !flavour.outOfStock) // Exclude out-of-stock flavours
            .map((flavour) => {
              const image =
                product.apiRoute === "generic/flavour"
                  ? getImage(flavour.localImage)
                  : "";
              return (
                <label key={flavour.name} htmlFor={flavour.name}>
                  <span>{flavour.name}</span>
                  {product.apiRoute === "generic/flavour" ? (
                    <div>
                      <input
                        id={flavour.name}
                        type="checkbox"
                        disabled={
                          !choosenFlavours.includes(flavour.name) &&
                          choosenFlavours.length >= maxSelections
                        }
                        name="flavour"
                        value={flavour.name}
                        onChange={handleChange}
                      />

                      <GatsbyImage image={image} alt={flavour.name} />
                    </div>
                  ) : (
                    <input
                      id={flavour.name}
                      type="checkbox"
                      disabled={
                        !choosenFlavours.includes(flavour.name) &&
                        choosenFlavours.length >= maxSelections
                      }
                      name="flavour"
                      value={flavour.name}
                      onChange={handleChange}
                    />
                  )}
                </label>
              );
            })}
        </div>

        <button name="go to cart">Comprar ahora</button>
        <button name="go to catalog">Agregar al carrito</button>
      </form>
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
    allFlavour {
      nodes {
        apiRoute

        name
        outOfStock

        localImage {
          absolutePath
          childImageSharp {
            gatsbyImageData(width: 48, height: 48, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
