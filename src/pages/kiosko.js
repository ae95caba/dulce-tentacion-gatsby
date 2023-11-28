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
import { CatalogBanner } from "../components/Images/Banners";

export default function Kiosko() {
  return (
    <main id="kiosko">
      <div className="content">
        <BannerSection
          h1={"Kiosko"}
          h2="afasdfas asfd"
          GatsbyImage={CatalogBanner}
        />
        <h3>SNACKS</h3>
        <div className="container">
          <SimpleSlider
            speed={1000}
            autoplaySpeed={3000}
            slidesToShow={3}
            fade={false}
          >
            <DonSatur />
            <Morochitas />
            <Mantecadas />
            <Marmoladas />
            <Pitusas />
            <SurtidasBagley />
            <Krachitos />
          </SimpleSlider>
        </div>
        <h3>BEBIDAS</h3>
        <div className="container">
          <SimpleSlider
            speed={1000}
            autoplaySpeed={3500}
            slidesToShow={3}
            fade={false}
          >
            <Baggio />
            <CocaCola />
            <DrLemon />
            <FrizzeBlue />
            <BrahmaChops />
            <Manaos />
            <Smirnoff />
            <SpeedXL />
          </SimpleSlider>
        </div>
      </div>
    </main>
  );
}
