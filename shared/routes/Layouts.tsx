import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
import Routes from "./routes";

const Layout = () => (
  <Switch>
    {Routes.map((route) => (
      <Route key={route.name} {...route} />
    ))}
  </Switch>
);
export default Layout;
