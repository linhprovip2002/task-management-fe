import config from "../config";
import {
  DashBoard,
  WorkspaceHighlights,
  WorkspaceViews,
  WorkspaceMembers,
  WorkspaceSettings
} from "../Pages";
import { DashboardLayout } from "../Layouts";

export const DashboardsRoutes = [
  {
    path: config.routes.workspaceHome,
    component: DashBoard,
    layout: DashboardLayout
  },
  {
    path: config.routes.workspaceHightlights,
    component: WorkspaceHighlights,
    layout: DashboardLayout
  },
  {
    path: config.routes.workspaceViews,
    component: WorkspaceViews,
    layout: DashboardLayout
  },
  {
    path: config.routes.workspaceMembers,
    component: WorkspaceMembers,
    layout: DashboardLayout
  },
  {
    path: config.routes.workspaceSettings,
    component: WorkspaceSettings,
    layout: DashboardLayout
  }
];
