import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
import { BannerSection } from "../components/BannerSection";
import { Link } from "gatsby";
import Maid from "../components/Images/Maid";
import Swal from "sweetalert2";
import toCartIcon from "../images/to-cart.svg";
import { CatalogBanner } from "../components/Images/Banners";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import listIcon from "../images/list.svg";
import handPointingIcon from "../images/hand-pointing.svg";
export default function Shop(props) {
  const products = props.data.allProduct.edges;

  return (
    <main id="catalog">
      <div className="content">
        <BannerSection
          h2="Ve al carrito para finalizar 👆 "
          h1="Catalogo"
          GatsbyImage={CatalogBanner}
        />
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
          <Maid />
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
    if (!product.flavours) {
      dispatch({
        type: "add-cart-item",
        payload: { id: product._id, product: structuredClone(product) },
      });
    } else {
      const encodedParamValue = encodeURIComponent(product.name);
      navigate(`/form?id=${product._id}`);
    }
  }

  console.log(`product is : ${product.description}`);
  return (
    <div className="card">
      <GatsbyImage image={image} alt={product.name} />
      {product.description && (
        <button
          className="info"
          onClick={() => {
            Swal.fire(
              `${product.name} :`,
              `${
                product.description
                  ? product.description
                  : "No hay mas informacion acerca de este producto"
              }`,
              "info"
            );
          }}
        >
          ?
        </button>
      )}

      <p className="product-name">{product.name}</p>
      <p className="product-price">$ {product.price}</p>

      <button onClick={handleClick} className={`to-cart  `}>
        {product.flavours ? (
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
    </div>
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
          _id
          flavours
        }
      }
    }
  }
`;
