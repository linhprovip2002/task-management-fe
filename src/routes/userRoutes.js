import config from "../config";
import { UserBoards } from "../Pages";
import { DashboardLayout } from "../Layouts";

export const UserRoutes = [
  {
    path: config.routes.userBoards,
    component: UserBoards,
    layout: DashboardLayout
  }
];
