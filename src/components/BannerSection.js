import React from "react";

export function BannerSection({ h2, h1, children }) {
  return (
    <section className="banner">
      <div className="container">
        {children}
        <h1>{h1}</h1>
      </div>

      <h2>{h2}</h2>
    </section>
  );
}
