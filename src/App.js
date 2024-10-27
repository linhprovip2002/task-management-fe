import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Layouts";
import { publicRoutes, privateRoutes } from "./routes";
import "@fontsource/inter";
import { CustomToastContainer } from "./Contexts/Toast";
import { RequiredAuth } from "./Components/RequiredAuth";
import { NotFound } from "./Pages/NotFound404/NotFound";

function App() {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
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
        <Route element={<RequiredAuth />}>
          {privateRoutes.map((route, index) => {
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CustomToastContainer />
    </>
  );
}

export default App;
