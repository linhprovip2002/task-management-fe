import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Layouts";
import { publicRoutes, privateRoutes } from "./routes";
import "@fontsource/inter";
import { CustomToastContainer } from "./Contexts/Toast";
import { useStorage } from "./Contexts";
import { useEffect } from "react";
import routes from "./config/routes";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStorage();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== routes.login) {
      window.location.href = routes.login;
      setIsLoggedIn(false);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
      <CustomToastContainer />
    </>
  );
}

export default App;