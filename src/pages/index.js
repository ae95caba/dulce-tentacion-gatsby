////////////
import "../assets/scss/index.scss";
import React, { useState, useRef } from "react";
import CountUp from "react-countup";
import { Link } from "gatsby";

import ScrollTrigger from "react-scroll-trigger";

import { Kilo, Cuarto, Medio, Deals } from "../components/Images/Promotions";
import {
  UnCuarto,
  UnCuarto2,
  UnKilo,
  Todos,
} from "../components/Images/Promotional";
import TextCarousel from "../components/TextCarousel";
import ImagesCarousel from "../components/ImagesCarousel";
import { Kid1, Kid2, Kid3, Kid4, Kid5, Kid6 } from "../components/Images/Kids";
import { StaticImage } from "gatsby-plugin-image";

const stringsArray = [
  "Helado Artesanal de la mejor calidad",
  "Aceptamos Mercado Pago",
  "Delivery Sin Cargo por la zona",
  "El sabor de la felicidad",
  "Somos calidad a precio accesible",
];

export default function Home() {
  return (
    <main id="home">
      <TextCarousel slides={stringsArray} />

      <section className="hero">
        <div className="content">
          <h3>#DULCE-TENTACION</h3>
          <div className="container">
            <ImagesCarousel
              slides={[<UnCuarto />, <UnCuarto2 />, <UnKilo />, <Todos />]}
            />
          </div>
          <h3>#Promos</h3>
          <div className="container">
            <ImagesCarousel
              slides={[<Kilo />, <Medio />, <Cuarto />, <Deals />]}
            />
          </div>
        </div>
      </section>
      <section className="motto">
        <div className="content">
          <p>
            No podes comprar felicidad, pero si podes comprar helado, lo que es
            casi lo mismo! 😎
          </p>

          <ImagesCarousel
            slides={[
              <Kid1 />,
              <Kid2 />,
              <Kid3 />,
              <Kid4 />,
              <Kid5 />,
              <Kid6 />,
            ]}
            slidesPerView={1}
          />
        </div>
      </section>
      <section class="stats">
        <div className="content">
          <Counter value={4} text={"Años en el rubro"} duration={4} />
          <Counter value={500} text={"Clientes satisfechos"} duration={5} />
          <Counter value={20} text={"Sabores diferentes"} duration={6} />
        </div>
      </section>
      <section className="call-to-action">
        <div className="content">
          <h2>Envios a Marcos Paz y Mariano Acosta</h2>
          <div className="container">
            <StaticImage
              src="../images/online-shop.png"
              alt="shopping-cart"
              placeholder="blurred"
            />
            <StaticImage src="../images/delivery.png" />
          </div>
          <Link to="/catalogo">
            <button>Pedi ya! 😋🍦</button>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Counter({ value, duration, text }) {
  const [startCounters, setStartCounters] = useState(false);
  return (
    <ScrollTrigger onEnter={() => setStartCounters(true)} className="container">
      <p>
        {startCounters ? (
          <CountUp end={value} duration={duration} start={0} delay={0.5} />
        ) : (
          "0"
        )}
      </p>
      <p>{text}</p>
    </ScrollTrigger>
  );
}
