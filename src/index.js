import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BookContextProvider } from "./store/BookContext";

ReactDOM.render(
  <BookContextProvider>
    <App />
  </BookContextProvider>,
  document.getElementById("root")
);
