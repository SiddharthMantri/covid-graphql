import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";

ReactDOM.hydrate(<App />, document.getElementById("root"));

// @ts-ignore
if (module.hot) {
  console.log("HMR Enabled");
  // @ts-ignore
  module.hot.accept();
}
