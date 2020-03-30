import { Route, Switch } from "react-router";
import React from "react";
import routes from "../../shared/routes";

const Layout = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.name} {...route} />
    ))}
  </Switch>
);
export default Layout;
