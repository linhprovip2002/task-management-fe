import config from "../config";
import { UserBoards, Profile } from "../Pages";
import { DashboardLayout, DefaultLayout } from "../Layouts";

export const UserRoutes = [
  {
    path: config.routes.userBoards,
    component: UserBoards,
    layout: DashboardLayout
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: DefaultLayout
  },
  {
    path: config.routes.profileActivity,
    component: Profile,
    layout: DefaultLayout
  },
  {
    path: config.routes.profileCards,
    component: Profile,
    layout: DefaultLayout
  },
  {
    path: config.routes.profileSettings,
    component: Profile,
    layout: DefaultLayout
  },
  {
    path: config.routes.profilePrivacy,
    component: Profile,
    layout: DefaultLayout
  }
];
