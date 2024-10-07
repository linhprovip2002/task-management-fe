import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './GlobalStyles';
// import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <CssVarsProvider theme={theme}> */}
    <CssBaseline>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </CssBaseline>
    {/* </CssVarsProvider> */}
  </>,
);

reportWebVitals();
