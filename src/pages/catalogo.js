import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { navigate } from "gatsby";
import Swal from "sweetalert2";
import toCartIcon from "../images/to-cart.svg";
import Image from "../components/Image";
import { graphql } from "gatsby";
export default function Shop(props) {
  const products = props.data.allProduct.edges;

  return (
    <main id="catalog">
      <>
        <h1>Catalogo</h1>
        <div className="cards-container">
          {products.map((product, index) => {
            const productData = product.node;
            return productData.outOfStock ? (
              ""
            ) : (
              <Card
                //this key props cause useless re-renders if set to uniqid()
                key={`${productData.name}`}
                product={productData}
              />
            );
          })}
        </div>
      </>
    </main>
  );
}

//this rerenders every time the addProductToCart function gets called
function Card({ product }) {
  const { catalog, dispatch, cartItems, ACTIONS } = useContext(GlobalContext);

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
      <Image url={product.imgUrl} />
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
