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
  profileActivity: "/user/:id/activity",
  profileCards: "/user/:id/cards",
  profilePrivacy: "/user/:id/privacy",
  profileSettings: "/user/:id/settings",
};

const routes = {
  notFound: "/not-found",
  login: "/login",
  forgotPassword: "/forgot-pass",
  signup: "/signup",
  listboard: "/workspace/:id/board/:idBoard",
  test: "/test",
  ...userRoutes,
  ...workspaceRoutes,
};

export default routes;
