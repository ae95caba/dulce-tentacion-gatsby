import React from "react";

import Image from "../components/Image";
export default function Gallery() {
  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

  return (
    <main id="gallery">
      <h1>Galeria</h1>
      <div className="gallery-container">
        {images.map((image) => (
          <Image url={`/img/galeria/${image}`} />
        ))}
      </div>
    </main>
  );
}
