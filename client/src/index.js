import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AppContainer } from "react-hot-loader";

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};
renderApp();
if (module.hot) module.hot.accept("./app", () => renderApp());
