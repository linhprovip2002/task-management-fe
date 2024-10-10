import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./GlobalStyles";
// import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <>
    {/* <CssVarsProvider theme={theme}> */}
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </CssBaseline>
    </QueryClientProvider>
    {/* </CssVarsProvider> */}
  </>
);

reportWebVitals();
