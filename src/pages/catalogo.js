import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import Maid from "../components/Images/Maid";
import Swal from "sweetalert2";
import toCartIcon from "../images/to-cart.svg";
import { CatalogBanner } from "../components/Images/Banners";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Shop(props) {
  const products = props.data.allProduct.edges;

  return (
    <main id="catalog">
      <div className="content">
        <section className="banner">
          <div className="container">
            <CatalogBanner />
            <h1>Catalogo</h1>
          </div>

          <h2>Añade productos a tu carrito</h2>
        </section>
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
          <div className="container">
            <p>Finaliza tu pedido</p>{" "}
            <Link to="/carrito">
              <button>Aca 👇</button>
            </Link>
          </div>
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
      //
      Swal.fire(
        `${product.name} agregado al carrito`,
        "Ve al carrito para finalizar tu compra",
        "success"
      );

      //
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

      <button onClick={handleClick} className={`to-cart  `}>
        <span>Añadir</span>

        <img style={{ filter: "invert(1)" }} src={toCartIcon} alt="cart icon" />
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
          name
          imgUrl
          _id
          flavours
        }
      }
    }
  }
`;
