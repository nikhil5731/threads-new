import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/theme-utils';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store.js';

const styles = {
  global: (props) => ({
    body: {
      color: mode('grey.800', 'whiteAlpha.900')(props),
      bg: mode('grey.100', '#101010')(props),
      // first arg is for light mode and second arg is for dark mode
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  grey: {
    light: '#616161',
    dark: '#1e1e1e',
  },
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
      <ToastContainer position='top-center' autoClose={2000} />
    </Provider>
  </ChakraProvider>
);
