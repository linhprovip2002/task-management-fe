import config from "../config";
import { BoardLayout, AuthLayout } from "../Layouts";
import { EmptyLayout } from "../Layouts/EmptyLayout/EmptyLayout";
import { Board, Login, SignUp, ListBoard } from "../Pages";
import { NotFound } from "../Pages/NotFound404/NotFound";
import { DashboardsRoutes } from "./dashboardsRoutes";
import { UserRoutes } from "./userRoutes";

const publicRoutes = [
  { path: config.routes.notFound, component: NotFound, layout: EmptyLayout },
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
