import config from '../config';
import BoardLayout from '../Layouts/BoardLayout';
import Board from '../Pages/Board';

// Page
import Home from '../Pages/Home';
import Login from '../Pages/Login';

// Khong can dang nhap
const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.board, component: Board, layout: BoardLayout },
];

// Can dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
