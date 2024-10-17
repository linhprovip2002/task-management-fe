import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { DefaultLayout } from './Layouts';
import { publicRoutes, privateRoutes } from './routes';
import '@fontsource/inter';
import { CustomToastContainer } from './Contexts/Toast';
import { useStorage } from './Contexts';
import { useEffect } from 'react';
import routes from './config/routes';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStorage();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  console.log({ location });

  useEffect(() => {
    if (!isLoggedIn && ![routes.login, routes.register].includes(location)) {
      navigate(routes.login);
      setIsLoggedIn(false);
    }
    if (isLoggedIn && [routes.login, routes.register].includes(location)) {
      navigate(routes.workspaceHome);
      setIsLoggedIn(true);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [location, isLoggedIn]);

  return (
    <>
      <Routes>
        {isLoggedIn
          ? privateRoutes.map((route, index) => {
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
                ></Route>
              );
            })
          : publicRoutes.map((route, index) => {
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
                ></Route>
              );
            })}
      </Routes>

      <CustomToastContainer />
    </>
  );
}

export default App;
