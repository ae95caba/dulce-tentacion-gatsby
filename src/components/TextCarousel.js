import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const breakpoints = {
  // Extra small devices (phones, < 640px)
  320: {
    slidesPerView: 1,
    spaceBetween: 10, // Space for very small screens
  },
  // Small devices (phones, 640px and up)
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  // Medium devices (tablets, 768px and up)
  768: {
    slidesPerView: 1,
    spaceBetween: 40,
  },
  // Large devices (desktops, 1024px and up)
  1024: {
    slidesPerView: 2, // Typically more columns on larger screens
    spaceBetween: 50,
  },
  // Extra large devices (large desktops, 1200px and up)
  1200: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
  // Monitors and TVs (typically 1440px and up)
  1440: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
};

export default function TextCarousel({ slides }) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={breakpoints}
      modules={[Pagination, Autoplay]}
      className="text-carousel"
    >
      {slides.map((slide) => (
        <SwiperSlide>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
