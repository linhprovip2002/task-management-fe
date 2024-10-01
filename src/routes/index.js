import config from "../config";

// Page
import Home from "../Pages/Home";
import Login from "../Pages/Login";

// Khong can dang nhap
const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.login, component: Login },
];

// Can dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
