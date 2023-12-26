import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';

import App from './modules/app/app';
import store from './modules/core/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
