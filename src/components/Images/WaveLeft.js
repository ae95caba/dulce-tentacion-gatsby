import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export default function WaveLeft() {
  return (
    <StaticImage
      src="../../images/wave.png"
      alt="wave"
      placeholder="blurred"
      className="left"
    />
  );
}
