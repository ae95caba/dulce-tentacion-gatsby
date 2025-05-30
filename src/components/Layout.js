import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import useSiteMetadata from "../hooks/use-sitemMetadata";
import Footer from "./Footer";
import "../styles/global.scss"; // Import the global CSS file
import OpenCloseSign from "./OpenCloseSign";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../components/SEO";
// Supports weights 400-700
import "@fontsource-variable/caveat";
import "@fontsource/roboto";
import "@fontsource/sofia";
import "../assets/scss/utils/_theme.scss";
export default function Layout({ children }) {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <SEO />
      <Header />
      {children}
      <ToastContainer />
      <Footer />
      {/* <OpenCloseSign /> */}
    </>
  );
}
