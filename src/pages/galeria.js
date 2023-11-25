import React from "react";
import { GalleryBanner } from "../components/Images/Banners";
import {
  Sambayon,
  DulceBombon,
  Granizado,
  Tiramizu,
  Kinder,
} from "../components/Images/Gallery";
import { BannerSection } from "../components/BannerSection";

export default function Gallery() {
  return (
    <main id="gallery">
      <div className="content">
        <BannerSection
          h1="Galeria"
          h2="Fotos 100% reales"
          GatsbyImage={GalleryBanner}
        />
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
