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
  const [mainMenuChosenFlavours, setMainMenuChosenFlavours] = useState([]);
  const [sauceMenuChosenFlavours, setSauceMenuChosenFlavours] = useState([]);
  if (!productIdParam) {
    return <p>Page not found</p>; // Or redirect to a 404 page
  }

  const product = products.find((product) => {
    return product.node._id === productIdParam;
  }).node;

  const flavoursOfSelectedProduct = allFlavours.filter((flavour) => {
    return flavour.apiRoute === product.apiRoute;
  });
  const saucesFlavours = allFlavours.filter((flavour) => {
    return flavour.apiRoute === "generic/sauce";
  });
  console.log(JSON.stringify(flavoursOfSelectedProduct));

  const maxSelections = product && (product.flavours || 1);
  //nuevo fin

  function handleMainMenuChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setMainMenuChosenFlavours((prev) => [...prev, value]);
    } else {
      const index = mainMenuChosenFlavours.indexOf(value);
      const copy = mainMenuChosenFlavours;
      copy.splice(index, 1);

      setMainMenuChosenFlavours([...copy]);
    }
  }

  function handleSauceMenuChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSauceMenuChosenFlavours((prev) => [...prev, value]);
    } else {
      const index = sauceMenuChosenFlavours.indexOf(value);
      const copy = sauceMenuChosenFlavours;
      copy.splice(index, 1);

      setSauceMenuChosenFlavours([...copy]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const buttonSubmitter = e.nativeEvent.submitter;
    const buttonName = buttonSubmitter.name;
    if (mainMenuChosenFlavours.length > 0) {
      dispatch({
        type: "add-cart-item",
        payload: {
          id: product._id,
          product: {
            ...product,
            chosenFlavours: mainMenuChosenFlavours,
            chosenSauces:
              sauceMenuChosenFlavours.length > 0
                ? sauceMenuChosenFlavours
                : undefined,
          },
          quantity: 1,
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

  function unorderedList(
    flavours,
    apiRoute,
    handleChange,
    chosenFlavours,
    namePrefix
  ) {
    return (
      <>
        <h3>
          {apiRoute === "generic/sauce" ? "Salsas" : "Sabores"}
          {maxSelections > 1 && (
            <span>{` ${mainMenuChosenFlavours.length}/${maxSelections}`}</span>
          )}
        </h3>
        <ul className="container">
          {flavours
            .filter((flavour) => !flavour.outOfStock)
            .map((flavour) => {
              const image =
                apiRoute === "generic/flavour" && getImage(flavour.localImage);
              return (
                <li>
                  <label
                    key={flavour.name}
                    htmlFor={`${namePrefix}-${flavour.name}`}
                  >
                    <span
                      style={{
                        color: chosenFlavours.includes(flavour.name)
                          ? "black"
                          : "inherit",
                      }}
                    >
                      {flavour.name}
                    </span>
                    <div>
                      <input
                        id={`${namePrefix}-${flavour.name}`}
                        type="checkbox"
                        disabled={
                          !chosenFlavours.includes(flavour.name) &&
                          chosenFlavours.length >= maxSelections
                        }
                        name={`${namePrefix}-flavour`}
                        value={flavour.name}
                        onChange={handleChange}
                      />
                      {apiRoute === "generic/flavour" && (
                        <GatsbyImage image={image} alt={flavour.name} />
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
        </ul>
      </>
    );
  }

  return (
    <main id="ice-cream-list">
      <form onSubmit={handleSubmit}>
        {<h1>{product.name} 🍨</h1>}
        <h2>
          {maxSelections === 1
            ? "Elige un sabor"
            : `Podes elegir hasta ${maxSelections} sabores`}
        </h2>
        <div>
          {unorderedList(
            flavoursOfSelectedProduct,
            product.apiRoute,
            handleMainMenuChange,
            mainMenuChosenFlavours,
            "main"
          )}
        </div>
        <div>
          {product.apiRoute === "generic/flavour" &&
            unorderedList(
              saucesFlavours,
              "generic/sauce",
              handleSauceMenuChange,
              sauceMenuChosenFlavours,
              "sauce"
            )}
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
