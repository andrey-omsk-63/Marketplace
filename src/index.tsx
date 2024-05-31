import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

const store = createStore(rootReducer);
// export const store = configureStore({
//   reducer: {
//     rootReducer,
//   },
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
