import "../assets/scss/catalogo.scss";
import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
import { BannerSection } from "../components/BannerSection";
import { SharedCardDescription } from "../components/SharedCardSections";
import toCartIcon from "../images/to-cart.svg";

import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import listIcon from "../images/list.svg";

export default function Shop(props) {
  const products = props.data.allProduct.edges;

  // Sort products by price from high to low
  const sortedProducts = products.sort((a, b) => {
    return b.node.price - a.node.price; // Sort in descending order
  });

  return (
    <main id="catalog">
      <div className="content">
        <BannerSection h2="Ve al carrito para finalizar 👆 " h1="Catalogo">
          <StaticImage src="../images/catalog-banner.jpg" />
        </BannerSection>
        <section className="cards-container">
          {sortedProducts.map((product, index) => {
            const productData = product.node;

            // Check if the product is out of stock or has a name that includes "salsa" or "rocklets"
            const isOutOfStock = productData.outOfStock;
            const isExcludedName =
              /salsa/i.test(productData.name) ||
              /rocklets/i.test(productData.name); // Regular expression for case-insensitive match

            return isOutOfStock || isExcludedName ? (
              ""
            ) : (
              <Card key={`${productData.name}`} product={productData} />
            );
          })}
        </section>
        <section className="maid">
          <StaticImage
            src="../images/maid.png"
            alt="maid"
            placeholder="blurred"
          />
        </section>
      </div>
    </main>
  );
}

//this rerenders every time the addProductToCart function gets called
function Card({ product }) {
  const { dispatch } = useContext(GlobalContext);
  const image = getImage(product.localImage);
  const buttonRef = useRef(null);
  function handleClick() {
    if (!product.apiRoute) {
      dispatch({
        type: "add-cart-item",
        payload: {
          product: structuredClone(product),
          quantity: 1,
        },
      });
    } else {
      const encodedParamValue = encodeURIComponent(product.name);
      navigate(`/form?id=${product._id}`);
    }
  }
  return (
    <div
      className="cart-item"
      onClick={() => {
        handleClick();
        buttonRef.current.classList.add("active");
      }}
    >
      <div className="image-container">
        <GatsbyImage
          image={image}
          alt={product.name}
          width={128}
          height={128}
        />
      </div>

      <SharedCardDescription product={product} />

      <Button
        buttonRef={buttonRef}
        handleClick={handleClick}
        apiRoute={product.apiRoute}
      />
    </div>
  );
}

function Button({ apiRoute, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      className="to-cart"
      onAnimationEnd={() => {
        buttonRef.current.classList.remove("active");
      }}
    >
      {apiRoute ? (
        <img src={listIcon} alt="cart icon" />
      ) : (
        <img src={toCartIcon} alt="cart icon" />
      )}
    </button>
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
              gatsbyImageData(
                width: 160
                height: 160
                layout: FIXED
                placeholder: BLURRED
              )
            }
          }
          outOfStock
          description
          name
          imgUrl
          apiRoute
          _id
          flavours
        }
      }
    }
  }
`;
