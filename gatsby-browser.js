import React from "react";

import GlobalContextProvider from "./src/context/GlobalContext";

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
