import config from '../config';
import { BoardLayout } from '../Layouts';
import { Board, Home, Login } from '../Pages';

// Page

// Khong can dang nhap
const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.board, component: Board, layout: BoardLayout },
];

// Can dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
