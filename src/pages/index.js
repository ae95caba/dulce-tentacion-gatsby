////////////

import React, { useState } from "react";
import WaveLeft from "../components/Images/WaveLeft";
import WaveRight from "../components/Images/WaveRight";
import SimpleSlider from "../components/SlickCarousel";
import { Kilo, Cuarto, Medio } from "../components/Images/Promotions";
import {
  UnCuarto,
  UnCuarto2,
  UnKilo,
  Todos,
} from "../components/Images/Promotional";
export default function Home() {
  return (
    <main id="home">
      <div className="content">
        <FirstCarousel />
        <h3>#DULCE-TENTACION</h3>

        <div className="container">
          <SimpleSlider speed={750} autoplaySpeed={1500}>
            <UnCuarto />
            <UnCuarto2 />
            <UnKilo />
            <Todos />
          </SimpleSlider>
        </div>

        <h3>#Promos</h3>

        <div className="container">
          <SimpleSlider speed={1000} autoplaySpeed={2500}>
            <Kilo />
            <Medio />
            <Cuarto /> <Kilo />
          </SimpleSlider>
        </div>
      </div>
    </main>
  );
}

function FirstCarousel() {
  return (
    <div className="first carousel">
      <div className="logos-slide">
        <span className="img"> Helado Artesanal de la mejor calidad</span>
        {<span className="img">Aceptamos Mercado Pago</span>}
        <span className="img">Delivery Sin Cargo por la zona</span>
      </div>
      <div className="logos-slide">
        <span className="img"> Helado Artesanal de la mejor calidad</span>
        {<span className="img">Aceptamos Mercado Pago</span>}
        <span className="img">Delivery Sin Cargo por la zona</span>
      </div>
    </div>
  );
}

/* function PromotionalCarousel() {
  const slider = (
    <div className="logos-slide">
      <UnCuarto />
      <UnCuarto2 />
      <UnKilo />
      <Todos />
    </div>
  );
  return (
    <div className="second carousel">
      {slider}
      {slider}
    </div>
  );
}

function PromotionsCarousel() {
  const slider = (
    <div className="logos-slide">
      <Kilo />
      <Medio />
      <Cuarto />
    </div>
  );
  return (
    <div className="third carousel">
      {slider} {slider}
    </div>
  );
}
 */
