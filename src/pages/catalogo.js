import "../assets/scss/catalogo.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
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
        <section className="product-cards">
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
  console.log(JSON.stringify(product));
  // Step 1: Add state for quantity
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    console.log("quantity is ");
    console.log(quantity);
  }, [quantity]);

  function handleClick() {
    console.log("quantity inside handleClick is");
    console.log(quantity);
    if (!product.apiRoute) {
      dispatch({
        type: "add-cart-item",
        payload: {
          product: structuredClone(product),
          quantity: quantity, // Step 4: Use quantity in dispatch payload
        },
      });
    } else {
      const encodedParamValue = encodeURIComponent(product.name);
      navigate(`/form?id=${product._id}`);
    }
  }

  // Step 2: Functions to handle quantity changes
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <GatsbyImage
          image={image}
          alt={product.name}
          width={128}
          height={128}
        />
      </div>

      {/* Step 3: Quantity controls */}
      {!product.apiRoute && (
        <div className="quantity">
          <button onClick={decrementQuantity}>-</button>
          <input
            type="number"
            value={quantity} // Bind input value to quantity state
            onChange={(e) => setQuantity(Math.max(1, e.target.value))} // Ensure it doesn't go below 1
          />
          <button onClick={incrementQuantity}>+</button>
        </div>
      )}

      <SharedCardDescription product={product} units={quantity} />

      <Button
        buttonRef={buttonRef}
        handleClick={handleClick}
        apiRoute={product.apiRoute}
      />
    </div>
  );
}

function Button({ apiRoute, buttonRef, handleClick }) {
  return (
    <button
      ref={buttonRef}
      className="to-cart"
      onAnimationEnd={() => {
        buttonRef.current.classList.remove("active");
        handleClick();
      }}
      onClick={() => {
        buttonRef.current.classList.add("active");
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
