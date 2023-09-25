////////////

import React, { useState } from "react";
import WaveLeft from "../components/Images/WaveLeft";
import WaveRight from "../components/Images/WaveRight";
import { Kilo, Cuarto, Medio } from "../components/Images/Promotions";
import {
  UnCuarto,
  UnCuarto2,
  UnKilo,
  Todos,
} from "../components/Images/Promotional";
export default function Home() {
  console.log(process.env.GATSBY_API_URL);
  return (
    <main id="home">
      <div className="content">
        <WaveRight />
        <FirstCarousel />
        <h3>#DULCE-TENTACION</h3>
        <PromotionalCarousel />
        <h3>#Promos</h3>
        <PromotionsCarousel />
        <WaveLeft />
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

function PromotionalCarousel() {
  return (
    <div className="second carousel">
      <div className="logos-slide">
        <UnCuarto />
        <UnCuarto2 />
        <UnKilo />
        <Todos />
      </div>
      <div className="logos-slide">
        <UnCuarto />
        <UnCuarto2 />
        <UnKilo />
        <Todos />
      </div>
    </div>
  );
}

function PromotionsCarousel() {
  return (
    <div className="second carousel">
      <div className="logos-slide">
        <Kilo />
        <Medio />
        <Cuarto />
      </div>
      <div className="logos-slide">
        <Kilo />
        <Medio />
        <Cuarto />
      </div>
    </div>
  );
}
