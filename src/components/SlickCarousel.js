import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({
  children,
  speed,
  autoplaySpeed,
  slidesToScroll,
}) {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: speed,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    slidesToShow: slidesToScroll,
    slidesToScroll: 1,
  };
  return <Slider {...settings}>{children}</Slider>;
}
