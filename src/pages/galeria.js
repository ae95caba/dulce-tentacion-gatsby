import React from "react";
import {
  Sambayon,
  DulceBombon,
  Granizado,
  Tiramizu,
  Kinder,
} from "../components/Images/Gallery";
import Layout from "../components/Layout";
export default function Gallery() {
  return (
    <Layout>
      <main id="gallery">
        <h1>Galeria</h1>
        <div className="gallery-container">
          <Sambayon />
          <DulceBombon />
          <Granizado />
          <Tiramizu />
          <Kinder />
        </div>
      </main>
    </Layout>
  );
}
