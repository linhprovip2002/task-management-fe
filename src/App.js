import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Layouts";
import { publicRoutes, privateRoutes } from "./routes";
import "@fontsource/inter";
import { CustomToastContainer } from "./Contexts/Toast";
import { useStorage } from "./Contexts";

function App() {
  const { isLoggedIn } = useStorage();
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
