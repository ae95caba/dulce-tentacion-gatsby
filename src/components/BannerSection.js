import React from "react";

export function BannerSection({ h2, h1, GatsbyImage }) {
  return (
    <section className="banner">
      <div className="container">
        <GatsbyImage />
        <h1>{h1}</h1>
      </div>

      <h2>{h2}</h2>
    </section>
  );
}
