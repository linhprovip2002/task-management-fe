import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './GlobalStyles';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// config font for MUI component
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family)',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </CssBaseline>
      </QueryClientProvider>
    </ThemeProvider>
  </>,
);

reportWebVitals();
