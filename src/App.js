import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate
} from "react-router-dom";
import { DefaultLayout } from "./Layouts";
import { publicRoutes, privateRoutes } from "./routes";
import "@fontsource/inter";
import { CustomToastContainer } from "./Contexts/Toast";
import { useStorage } from "./Contexts";
import { useEffect, useRef } from "react";
import routes from "./config/routes";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (
      isLoggedIn &&
      [routes.login, routes.register].includes(location.pathname)
    ) {
      navigate(routes.workspaceHome);
      setIsLoggedIn(true);
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [location.pathname, isLoggedIn]);

  if (!isLoggedIn && ![routes.login, routes.register].includes(location))
    return <Navigate to={routes.login} />;

  return (
    <>
      <Routes>
        {[...privateRoutes, ...publicRoutes].map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || DefaultLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <CustomToastContainer />
    </>
  );
}

export default App;
