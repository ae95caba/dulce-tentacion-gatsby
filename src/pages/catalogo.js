import "../assets/scss/catalogo.scss";
import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
import { BannerSection } from "../components/BannerSection";

import toCartIcon from "../images/to-cart.svg";

import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import listIcon from "../images/list.svg";

export default function Shop(props) {
  const products = props.data.allProduct.edges;

  return (
    <main id="catalog">
      <div className="content">
        <BannerSection h2="Ve al carrito para finalizar 👆 " h1="Catalogo">
          <StaticImage src="../images/catalog-banner.jpg" />
        </BannerSection>
        <section className="cards-container">
          {products.map((product, index) => {
            const productData = product.node;

            return productData.outOfStock ? (
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

  function handleClick() {
    if (!product.apiRoute) {
      dispatch({
        type: "add-cart-item",
        payload: { id: product._id, product: structuredClone(product) },
      });
    } else {
      const encodedParamValue = encodeURIComponent(product.name);
      navigate(`/form?id=${product._id}`);
    }
  }

  return (
    <div className="card">
      <GatsbyImage image={image} alt={product.name} />

      <p className="product-name">{product.name}</p>
      <p className="product-price">$ {product.price}</p>

      <Button handleClick={handleClick} apiRoute={product.apiRoute} />
    </div>
  );
}

function Button({ handleClick, apiRoute }) {
  const buttonRef = useRef(null);

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        handleClick();
        buttonRef.current.classList.add("active");
      }}
      className="to-cart"
      onAnimationEnd={() => {
        buttonRef.current.classList.remove("active");
      }}
    >
      {apiRoute ? (
        <>
          <span>Sabores</span>
          <img src={listIcon} alt="cart icon" />
        </>
      ) : (
        <>
          <span>Al carrito</span>
          <img src={toCartIcon} alt="cart icon" />
        </>
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
              gatsbyImageData(placeholder: BLURRED)
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
