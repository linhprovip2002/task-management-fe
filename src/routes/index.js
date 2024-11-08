import config from "../config";
import { AuthLayout } from "../Layouts";
import { EmptyLayout } from "../Layouts/EmptyLayout/EmptyLayout";
import { Login, SignUp, ListBoard, Test } from "../Pages";
import { NotFound } from "../Pages/NotFound404/NotFound";
import { DashboardsRoutes } from "./dashboardsRoutes";
import { UserRoutes } from "./userRoutes";

const publicRoutes = [
  { path: config.routes.notFound, component: NotFound, layout: EmptyLayout },
  { path: config.routes.login, component: Login, layout: AuthLayout },
  { path: config.routes.signup, component: SignUp, layout: AuthLayout },
  { path: config.routes.test, component: Test, layout: null }
];

const privateRoutes = [
  { path: config.routes.listboard, component: ListBoard },
  ...UserRoutes,
  ...DashboardsRoutes
];

export { publicRoutes, privateRoutes };
