import Home from "../../client/src/Pages/Home";
import CountryDetail from "../../client/src/Pages/CountryDetail";

const Routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/country/:country",
    name: "country",
    exact: false,
    component: CountryDetail,
  },
];

export default Routes;
