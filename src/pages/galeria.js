import "../assets/scss/galeria.scss";
import React from "react";

import {
  Sambayon,
  DulceBombon,
  Granizado,
  Tiramizu,
  Kinder,
} from "../components/Images/Gallery";
import { BannerSection } from "../components/BannerSection";
import { StaticImage } from "gatsby-plugin-image";

export default function Gallery() {
  return (
    <main id="gallery">
      <div className="content">
        <BannerSection h1="Galeria" h2="Fotos 100% reales">
          <StaticImage src="../images/gallery-banner.jpeg" />
        </BannerSection>
        <div className="gallery-container">
          <Sambayon />
          <DulceBombon />
          <Granizado />
          <Tiramizu />
          <Kinder />
        </div>
      </div>
    </main>
  );
}
