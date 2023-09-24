import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function Quotes() {
  return (
    <StaticImage
      src="../../images/quotes.png"
      alt="comillas"
      placeholder="blurred"
      className="quotes"
    />
  );
}
