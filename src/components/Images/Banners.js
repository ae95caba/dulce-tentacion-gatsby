import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export function CatalogBanner() {
  return (
    <StaticImage
      src="../../images/catalog-banner.jpg"
      alt="Catalog banner"
      placeholder="blurred"
    />
  );
}

export function CartBanner() {
  return (
    <StaticImage
      src="../../images/cashier.jpg"
      alt="cashier"
      placeholder="blurred"
    />
  );
}
