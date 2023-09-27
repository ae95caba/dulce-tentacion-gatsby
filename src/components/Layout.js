import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import useSiteMetadata from "../hooks/use-sitemMetadata";
import Footer from "./Footer";
import "../styles/global.scss"; // Import the global CSS file

export default function Layout({ children }) {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </>
  );
}
