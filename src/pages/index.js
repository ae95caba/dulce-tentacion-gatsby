////////////

import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import SimpleSlider from "../components/SlickCarousel";
import { Kilo, Cuarto, Medio, Deals } from "../components/Images/Promotions";
import {
  UnCuarto,
  UnCuarto2,
  UnKilo,
  Todos,
} from "../components/Images/Promotional";
import { Kid1, Kid2, Kid3, Kid4 } from "../components/Images/Kids";
export default function Home() {
  const [startCounters, setStartCounters] = useState(false);

  return (
    <main id="home">
      <section className="hero">
        <FirstCarousel />

        <div className="content">
          <h3>#DULCE-TENTACION</h3>
          <div className="container">
            <SimpleSlider
              speed={1000}
              autoplaySpeed={3000}
              slidesToShow={3}
              fade={false}
            >
              <UnCuarto />
              <UnCuarto2 />
              <UnKilo />
              <Todos />
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
              <Kilo />
              <Medio />
              <Cuarto /> <Deals />
            </SimpleSlider>
          </div>
        </div>
      </section>
      <section className="motto">
        <div className="content">
          <p>
            No podes comprar felicidad, pero si podes comprar helado, lo que es
            casi lo mismo! 😎
          </p>
          <SimpleSlider
            speed={1000}
            autoplaySpeed={3500}
            slidesToShow={1}
            fade={true}
          >
            <Kid1 />
            <Kid2 /> <Kid3 /> <Kid4 />
          </SimpleSlider>
        </div>
      </section>
      <section class="stats">
        <ScrollTrigger
          onEnter={() => setStartCounters(true)}
          className="content"
        >
          <div class="container">
            <p>
              {startCounters && (
                <CountUp end={4} duration={6} start={0} delay={0.5} />
              )}
            </p>
            <p>Años en el rubro</p>
          </div>
          <div class="container">
            <p>
              {startCounters && (
                <CountUp end={500} duration={7.5} start={0} delay={0.5} />
              )}
            </p>
            <p>Clientes satisfechos</p>
          </div>
          <div class="container">
            <p>
              {startCounters && (
                <CountUp end={20} duration={3} start={0} delay={0.5} />
              )}
            </p>
            <p>Sabores diferentes</p>
          </div>
        </ScrollTrigger>
      </section>
    </main>
  );
}

function FirstCarousel() {
  const slide = (
    <div className="logos-slide">
      <span className="img">Helado Artesanal de la mejor calidad</span>
      <span className="img">Aceptamos Mercado Pago</span>
      <span className="img">Delivery Sin Cargo por la zona</span>
      <span className="img">El sabor de la felicidad</span>
      <span className="img">Somos calidad a precio accesible</span>
    </div>
  );
  return (
    <div className="first carousel">
      {slide}
      {slide}
    </div>
  );
}
