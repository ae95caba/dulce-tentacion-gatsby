////////////

import React, { useState, useRef } from "react";
import CountUp from "react-countup";
import { Link } from "gatsby";
import animationData from "../animations/delivery.json";
import Lottie from "lottie-react";
import ScrollTrigger from "react-scroll-trigger";
import SimpleSlider from "../components/SlickCarousel";
import ShoppingCart from "../components/Images/ShoppingCart";
import { Kilo, Cuarto, Medio, Deals } from "../components/Images/Promotions";
import {
  UnCuarto,
  UnCuarto2,
  UnKilo,
  Todos,
} from "../components/Images/Promotional";
import Carousel from "../components/Carousel";
import SecondCarousel from "../components/SecondCarouse";
import { Kid1, Kid2, Kid3, Kid4, Kid5, Kid6 } from "../components/Images/Kids";

const stringsArray = [
  "Helado Artesanal de la mejor calidad",
  "Aceptamos Mercado Pago",
  "Delivery Sin Cargo por la zona",
  "El sabor de la felicidad",
  "Somos calidad a precio accesible",
];

export default function Home() {
  const deliveryAnimationRef = useRef(null);
  return (
    <main id="home">
      <Carousel slides={stringsArray} />

      <section className="hero">
        <div className="content">
          <h3>#DULCE-TENTACION</h3>
          <div className="container">
            <SecondCarousel
              slides={[<UnCuarto />, <UnCuarto2 />, <UnKilo />, <Todos />]}
            />
          </div>
          <h3>#Promos</h3>
          <div className="container">
            <SecondCarousel
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
          <SimpleSlider
            speed={1000}
            autoplaySpeed={3500}
            slidesToShow={1}
            fade={true}
          >
            <Kid1 />
            <Kid2 /> <Kid3 /> <Kid4 /> <Kid5 /> <Kid6 />
          </SimpleSlider>
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
            <ShoppingCart />
            <Lottie
              lottieRef={deliveryAnimationRef}
              animationData={animationData}
              autoplay={true}
              loop={true}
            />
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
