import "../assets/scss/testimonios.scss";
import React from "react";
import Quotes from "../components/Images/Quotes";
import {
  FirstAvatar,
  SecondAvatar,
  ThirdAvatar,
  FourthAvatar,
} from "../components/Images/Avatars";
import { BannerSection } from "../components/BannerSection";
import { StaticImage } from "gatsby-plugin-image";

const reviewsArr = [
  {
    message: `Exelente servicio muy ricos helados,
    Muy buena atención gracias ✨👏👏`,
    author: "Karina Bianchi",
    dateString: "Hace un año",
    avatar: <FirstAvatar />,
  },
  {
    message: `Helados super deliciosos. Recomendable. Buen precio. Buena atención.`,
    author: "Paula Galafassi",
    dateString: "Hace un año",
    avatar: <SecondAvatar />,
  },
  {
    message: `Son muy ricos helados. Súper recomendables. Buena atención. Buen precio`,
    author: "Nelida Torres",
    dateString: "Hace un año",
    avatar: <ThirdAvatar />,
  },
  {
    message: `Buenisima atencion..
    Riquisimo los🍧`,
    author: "Maria Acosta",
    dateString: "Hace un año",
    avatar: <FourthAvatar />,
  },
];

export default function Reviews() {
  return (
    <main id="reviews">
      <div className="content">
        <BannerSection h1={"Testimonios"} h2="de algunos de nuestros clientes">
          <StaticImage src="../images/reviews-banner.jpeg" />
        </BannerSection>

        <div className="container">
          {reviewsArr.map((review) => (
            <Review review={review} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Review({ review }) {
  return (
    <div className="review">
      <p>"{review.message}"</p>
      <section>
        {review.avatar}
        <div className="sub-container">
          <h4>{review.author}</h4>
          <p>{review.dateString}</p>
        </div>
        <Quotes />
      </section>
    </div>
  );
}
