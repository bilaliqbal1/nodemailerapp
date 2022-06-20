import Dashboard from "./pages/Dashboard";
import EmailCompose from "./pages/EmailCompose";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = [
  {
    path: "/login",
    component: Login,
    secure: false,
  },
  {
    path: "/register",
    component: Register,
    secure: false,
  },
  {
    path: "/",
    component: Dashboard,
    secure: true,
  },
  {
    path: "/compose",
    component: EmailCompose,
    secure: true,
  },
];

export default routes;
