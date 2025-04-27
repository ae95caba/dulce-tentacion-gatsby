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
import DetailsSection from "../components/DetailsSection";
import cone from "../images/ice-cream-cone.svg";
export default function IceCreamForm({ data, location }) {
  const { dispatch } = useContext(GlobalContext);
  const allParams = new URLSearchParams(location.search);
  const productIdParam = allParams.get("id");
  const products = data.allProduct.edges;
  const allFlavours = data.allFlavour.nodes;
  const [rockletsChecked, setRockletsChecked] = useState(false);
  const [mainMenuChosenFlavours, setMainMenuChosenFlavours] = useState([]);
  const [sauceMenuChosenFlavours, setSauceMenuChosenFlavours] = useState([]);
  if (!productIdParam) {
    return <p>Page not found</p>; // Or redirect to a 404 page
  }

  const product = products.find((product) => {
    return product.node._id === productIdParam;
  }).node;

  const saucePrice = products.find((product) => {
    return product.node.apiRoute === "generic/sauce";
  }).node.price;

  const rockletsPrice = products.find((product) => {
    return product.node.name.toLowerCase() === "rocklets";
  }).node.price;

  const totalPrice =
    sauceMenuChosenFlavours.length * saucePrice +
    product.price +
    (rockletsChecked ? rockletsPrice : 0);

  const flavoursOfSelectedProduct = allFlavours.filter((flavour) => {
    return flavour.apiRoute === product.apiRoute;
  });
  const saucesFlavours = allFlavours.filter((flavour) => {
    return flavour.apiRoute === "generic/sauce";
  });

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
            addOns: {
              sauces: {
                price: saucePrice,
                chosenSauces:
                  sauceMenuChosenFlavours.length > 0
                    ? sauceMenuChosenFlavours
                    : undefined,
              },
              rocklets: { price: rockletsPrice, included: rockletsChecked },
            },
            priceWithAddOns: totalPrice,
            chosenFlavours:
              mainMenuChosenFlavours.length > 0
                ? mainMenuChosenFlavours
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
    namePrefix,
    maxSelections
  ) {
    const isSauce = apiRoute === "generic/sauce";

    return (
      <>
        <h2>
          {maxSelections === 1
            ? `Elige ${isSauce ? "una salsa" : "un sabor"}:`
            : `Podes elegir hasta ${maxSelections} sabores:`}
        </h2>
        <div>
          <h3>
            {isSauce ? "Salsas" : "Sabores"}
            {maxSelections > 1 && (
              <span>{` ${chosenFlavours.length}/${maxSelections}`}</span>
            )}
          </h3>
          <ul className="container">
            {flavours
              .filter((flavour) => !flavour.outOfStock)
              .map((flavour) => {
                const image =
                  apiRoute === "generic/flavour" &&
                  getImage(flavour.localImage);
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
        </div>
      </>
    );
  }

  return (
    <main id="ice-cream-list">
      <form onSubmit={handleSubmit}>
        {<h1>{product.name} 🍨</h1>}

        {unorderedList(
          flavoursOfSelectedProduct,
          product.apiRoute,
          handleMainMenuChange,
          mainMenuChosenFlavours,
          "main",
          product.flavours || 1
        )}

        <>
          {product.apiRoute === "generic/flavour" &&
            unorderedList(
              saucesFlavours,
              "generic/sauce",
              handleSauceMenuChange,
              sauceMenuChosenFlavours,
              "sauce",
              1
            )}
        </>

        {product.apiRoute === "generic/flavour" && (
          <>
            <label className="rocklets-label">
              <span>Rocklets</span>
              <div>
                <input
                  type="checkbox"
                  checked={rockletsChecked}
                  onChange={(e) => setRockletsChecked(e.target.checked)}
                />
              </div>
            </label>

            <DetailsSection
              product={product}
              rocklets={{ price: rockletsPrice, included: rockletsChecked }}
              sauces={{
                price: saucePrice,
                chosenSauces: sauceMenuChosenFlavours,
              }}
              priceWithAddOns={totalPrice}
              chosenFlavours={mainMenuChosenFlavours}
            />
          </>
        )}
        <div className="buttons-container">
          <button
            name="go to cart"
            className={mainMenuChosenFlavours.length === 0 ? "disabled" : ""}
          >
            Ir a caja 🛒
          </button>
          <button
            name="go to catalog"
            className={mainMenuChosenFlavours.length === 0 ? "disabled" : ""}
          >
            Seguir comprando 🍦
          </button>
        </div>
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
              gatsbyImageData(
                width: 160
                height: 160
                layout: FIXED
                placeholder: BLURRED
              )
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
