import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";

// @ts-ignore
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<App />, document.getElementById("root"));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
