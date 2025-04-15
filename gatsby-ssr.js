// gatsby-ssr.js

import React from "react";

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es" });

  setHeadComponents([
    <link
      key="parkinsans"
      rel="preload"
      href="/fonts/Parkinsans.var.ttf"
      as="font"
      type="font/ttf-variations"
      crossOrigin="anonymous"
    />,
  ]);
};
