import Home from "../Pages/Home";
import CountryDetail from "../Pages/CountryDetail";

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
