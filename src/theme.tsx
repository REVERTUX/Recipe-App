import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: { default: '#F4F7FC' },
  },
  typography: {
    body1: {
      fontSize: 18,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a {
          text-decoration: none;
        }
      `,
    },
  },
});

export default theme;
