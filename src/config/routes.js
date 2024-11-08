export const workspaceRoutes = {
  workspaceHome: "/workspace/:id/home",
  workspaceHightlights: "/workspace/:id/highlights",
  workspaceViews: "/workspace/:id/views",
  workspaceMembers: "/workspace/:id/members",
  workspaceSettings: "/workspace/:id/settings"
};

export const userRoutes = {
  userBoards: "/user/:id/boards",
  profile: "/user/:id",
  profileActivity: "/user/:id/activity",
  profileCards: "/user/:id/cards",
  profileSettings: "/user/:id/settings"
};

const routes = {
  notFound: "/not-found",
  login: "/login",
  signup: "/signup",
  listboard: "/workspace/:idWorkSpace/board/:idBoard",
  test: "/test",
  ...userRoutes,
  ...workspaceRoutes
};

export default routes;
