import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function SadShoppingCart() {
  return (
    <StaticImage
      src="../../images/sad-shopping-cart.png"
      alt="Logo"
      placeholder="blurred"
      class="sad-shopping-cart"
    />
  );
}
