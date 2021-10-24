import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./App.css";
import { App } from "./components/App";
import { store } from "./_helpers";
const searchDom = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  searchDom
);
