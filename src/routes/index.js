import config from "../config";
import { BoardLayout, AuthLayout } from "../Layouts";
import { Board, Home, Login, SignUp, ListBoard } from "../Pages";
import { DashboardsRoutes } from "./dashboardsRoutes";
import { UserRoutes } from "./userRoutes";

const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.login, component: Login, layout: AuthLayout },
  { path: config.routes.signup, component: SignUp, layout: AuthLayout }
];

const privateRoutes = [
  { path: config.routes.board, component: Board, layout: BoardLayout },
  { path: config.routes.listboard, component: ListBoard },
  ...UserRoutes,
  ...DashboardsRoutes
];

export { publicRoutes, privateRoutes };
