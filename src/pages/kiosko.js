import React from "react";
import {
  Marmoladas,
  Krachitos,
  DonSatur,
  SurtidasBagley,
  Pitusas,
  Morochitas,
  Mantecadas,
} from "../components/Images/Snacks";
import {
  CocaCola,
  Baggio,
  DrLemon,
  FrizzeBlue,
  BrahmaChops,
  Manaos,
  Smirnoff,
  SpeedXL,
} from "../components/Images/Drinks";
import SimpleSlider from "../components/SlickCarousel";
import { BannerSection } from "../components/BannerSection";
import { KioskoBanner } from "../components/Images/Banners";
import ImagesCarousel from "../components/ImagesCarousel";
export default function Kiosko() {
  return (
    <main id="kiosko">
      <div className="content">
        <BannerSection
          h1={"Kiosko"}
          h2="Precios por whatsapp"
          GatsbyImage={KioskoBanner}
        />
        <h3>SNACKS</h3>
        <div className="container">
          <ImagesCarousel
            slides={[
              <DonSatur />,
              <Morochitas />,
              <Mantecadas />,
              <Marmoladas />,
              <Pitusas />,
              <SurtidasBagley />,
              <Krachitos />,
            ]}
          />
        </div>
        <h3>BEBIDAS</h3>
        <div className="container">
          <ImagesCarousel
            slides={[
              <Baggio />,
              <CocaCola />,
              <DrLemon />,
              <FrizzeBlue />,
              <BrahmaChops />,
              <Manaos />,
              <Smirnoff />,
              <SpeedXL />,
            ]}
          />
        </div>
      </div>
    </main>
  );
}
