import * as React from "react";
import * as ReactDOM from "react-dom";

import { MovieApp } from "@components/MovieApp";
import { Provider } from "react-redux";
import store from "@store";
import "@styles/main.scss";
import "@styles/fonts.css";

const movieApp: JSX.Element = (
  <Provider store={store}>
    <MovieApp />
  </Provider>
);

ReactDOM.render(movieApp, document.getElementById("app"));
