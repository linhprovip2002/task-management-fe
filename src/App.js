import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Layouts";
import { publicRoutes } from "./routes";
import "@fontsource/inter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className={`App`}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else {
                if (route.layout === null) {
                  Layout = Fragment;
                }
              }
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
        </div>
      </BrowserRouter>
      <ToastContainer
        style={{
          fontSize: 14,
        }}
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
      />
    </>
  );
}

export default App;
