import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { Amplify } from 'aws-amplify';
import App from './App';
import theme from './theme';
import { store } from './app/store';
import AuthProvider from './AuthProvider';

const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const AWS_USER_POOL_ID = import.meta.env.VITE_AWS_USER_POOL_ID;
const AWS_USER_POOL_APP_CLIENT_ID = import.meta.env
  .VITE_AWS_USER_POOL_APP_CLIENT_ID;

Amplify.configure({
  Auth: {
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_POOL_APP_CLIENT_ID,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
