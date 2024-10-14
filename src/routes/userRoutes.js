import config from '../config';
import { Profile, UserBoards } from '../Pages';
import { DashboardLayout, DefaultLayout } from '../Layouts';

export const UserRoutes = [
  {
    path: config.routes.userBoards,
    component: UserBoards,
    layout: DashboardLayout,
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: DefaultLayout,
  },
];
