import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function ImagesCarousel({ slides }) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      longSwipesRatio={0.1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={3}
      modules={[Pagination, Autoplay]}
      className="image-carousel"
    >
      {slides.map((slide) => (
        <SwiperSlide>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
