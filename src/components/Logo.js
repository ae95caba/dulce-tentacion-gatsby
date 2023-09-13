import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function We() {
  return (
    <StaticImage
      src="../images/logo-white.png"
      id="logo"
      alt="A dinosaur"
      placeholder="blurred"
      className="logo"
    />
  );
}
