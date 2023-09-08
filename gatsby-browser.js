import React from "react";
import Layout from "./src/components/Layout";
import GlobalContextProvider from "./src/context/GlobalContext";

export const wrapPageElement = ({ element, props }) => {
  // console.log(`wrapPage props:${JSON.stringify(props)}`);
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
