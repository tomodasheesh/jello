import ReactDOM from 'react-dom/client';
import { PageRouteProvider } from './router/provider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <PageRouteProvider />
  </ThemeProvider>
);
