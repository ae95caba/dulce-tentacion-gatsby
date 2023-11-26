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
import SimpleSlider from "../components/SlickCarousel";

export default function Kiosko() {
  return (
    <main id="kiosko">
      <div className="content">
        <h3>#DULCE-TENTACION</h3>
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
        <h3>#Promos</h3>
        <div className="container">
          <SimpleSlider
            speed={1000}
            autoplaySpeed={3500}
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
      </div>
    </main>
  );
}
