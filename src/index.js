import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

const store = configureStore({ reducer: reducers, middleware: [thunk] });

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
