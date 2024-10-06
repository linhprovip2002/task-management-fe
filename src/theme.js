import { createTheme } from "@mui/material/styles";
// import {  teal } from "@mui/material/colors";


// A custom theme for this app using experimental_extendTheme
const theme = createTheme({
  trelloCustom: {
    headerHeight: '68px',
    navbarHeight: '68px',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0c66e4', // Xam
        },
        secondary: {
          main: '#44546f', // Xanh da trời
        },
      },
    },

  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // color: '#0c66e4',
          fontSize: '14px',
          textTransform: 'none',
          fontWeight: '500'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '14px',
          textTransform: 'none',
          fontWeight: '500',
          marginTop: '12px'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        })
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            // color: '#44546f',
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: theme.palette.primary.main,
              fontSize: '0.875rem',
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.primary.main,
                fontSize: '0.875rem',
              },
            }
          };
        },
      },
    },
  },

  // Add CSS variable-based color modes
  // cssVarPrefix: 'mui', // This is optional but recommended to avoid conflicts
});

export default theme;
