import React from "react";
import { Route, Switch } from "react-router";
import Routes from "./routes";

const Layout = () => (
  <Switch>
    {Routes.map((route) => (
      <Route key={route.name} {...route} />
    ))}
  </Switch>
);

export default Layout;
