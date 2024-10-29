export const workspaceRoutes = {
  workspaceHome: "/workspace/:id/home",
  workspaceHightlights: "/workspace/:id/highlights",
  workspaceViews: "/workspace/:id/views",
  workspaceMembers: "/workspace/:id/members",
  workspaceSettings: "/workspace/:id/settings",
};

export const userRoutes = {
  userBoards: "/user/:id/boards",
  profile: "/user/:id",
};

const routes = {
  // root: "/",
  notFound: "/not-found",
  login: "/login",
  board: "/board",
  dashboard: "/dashboard",
  home: "home",
  signup: "/signup",
  listboard: "/workspace/:idWorkSpace/board/:idBoard",
  test: "/test",
  ...userRoutes,
  ...workspaceRoutes,
};

export default routes;
