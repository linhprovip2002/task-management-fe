import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './GlobalStyles';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './Contexts/Toast';
import Storage from './Contexts/Storage';

// config font for MUI component
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family)',
  },
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          marginTop: '10px'
        },
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: {
    //       // Some CSS
    //       // fontSize: '14px',
    //       // textTransform: 'none',
    //       // fontWeight: '500',
    //       Color: 'white',
         
    //     },
    //   },
    // },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: ({ theme }) => ({
    //       color: theme.palette.primary.main,
    //       fontSize: '0.875rem',
    //     })
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: ({ theme }) => {
    //       return {
    //         // color: theme.palette.primary.main,
    //         '.MuiOutlinedInput-notchedOutline': {
    //           borderColor: theme.palette.primary.main,
    //           fontSize: '0.875rem',
    //         },
    //         '&:hover': {
    //           '.MuiOutlinedInput-notchedOutline': {
    //             // borderColor: theme.palette.primary.main,
    //             fontSize: '0.875rem',
    //           },
    //         }
    //       };
    //     },
    //   },
    // },
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
            <Storage>
              <ToastProvider>
                <App />
              </ToastProvider>
            </Storage>
          </GlobalStyles>
        </CssBaseline>
      </QueryClientProvider>
    </ThemeProvider>
  </>,
);

reportWebVitals();
