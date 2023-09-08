import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "./Image";
import { useState, useEffect } from "react";

export function Home({ iceCream }) {
  return (
    <>
      <div className="content">
        <img className="right" src="/wave2.png" />
        <Carousel1 />
        <h3>#DULCE-TENTACION</h3>
        <Carousel2 />
        <h3>#Promos</h3>
        <Carousel3 iceCream={iceCream} />
        <img className="left" src="/wave2.png" />
      </div>
    </>
  );
}

function Carousel1() {
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

function Carousel2() {
  const urls = [
    "/img/carousel/netflix.jpg",

    "/img/carousel/delivery.jpg",
    "/img/carousel/doge.jpg",
  ];
  return (
    <div className="second carousel">
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
    </div>
  );
}

function Carousel3({ iceCream }) {
  function getRoundNumber(number) {
    const lastTwoDigits = number % 100;
    const redondeo = lastTwoDigits > 50 ? 100 : 50;
    const roundNumber = Math.floor(number / 100) * 100 + redondeo;
    return roundNumber;
  }

  const offers = [
    {
      url: "/img/carousel/ofertas.jpg",
    },
    {
      url: "/img/carousel/promo-medio.png",

      price: getRoundNumber(iceCream[1].price * 2 * 0.9),
      style: {
        position: "absolute",
        fontSize: "1.2rem",
        fontWeight: "900",
        backgroundColor: "white",
        top: "77%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        color: "#601CA4",
      },
    },
    {
      url: "/img/carousel/promo-cuarto.png",
      style: {
        position: "absolute",
        fontSize: "1.2rem",
        fontWeight: "900",
        backgroundColor: "white",
        top: "77%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        color: "#601CA4",
      },

      price: getRoundNumber(iceCream[2].price * 2 * 0.9),
    },
  ];

  const slide = offers.map((offer) => (
    <Image2 url={offer.url} price={offer.price} style={offer.style} />
  ));

  return (
    <div className="third carousel">
      <div className="logos-slide">{slide}</div>
      <div className="logos-slide">{slide}</div>
    </div>
  );
}

function Image2({ url, price, style }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`img-loader-container promo`}
      style={{ position: "relative" }}
    >
      {isLoaded && price && <span style={style}>${price}</span>}
      <img
        src={url}
        onLoad={onLoad}
        alt="product"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
      <span
        className="loader"
        style={{ display: !isLoaded ? "block" : "none" }}
      ></span>
    </div>
  );
}
