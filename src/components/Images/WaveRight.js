import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function WaveRight() {
  return (
    <StaticImage
      src="../../images/wave.png"
      alt="marco en forma de onda"
      placeholder="blurred"
      className="right"
    />
  );
}
