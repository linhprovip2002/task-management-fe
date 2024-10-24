import config from "../config";
import { UserBoards, Profile } from "../Pages";
import { DashboardLayout } from "../Layouts";

export const UserRoutes = [
  {
    path: config.routes.userBoards,
    component: UserBoards,
    layout: DashboardLayout,
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: DashboardLayout,
  },
];
