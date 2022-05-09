import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { PageProvider } from './contexts/Content-router';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <PageProvider>
      <App />
    </PageProvider>
  </ThemeProvider>,
  document.querySelector('#root'),
);
