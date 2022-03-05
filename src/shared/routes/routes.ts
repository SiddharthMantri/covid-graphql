import Home from "../containers/Home";
import CountryDetail from "../containers/CountryDetail";

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
