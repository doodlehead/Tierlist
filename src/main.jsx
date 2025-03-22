import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import * as serviceWorker from "./serviceWorker.js";
// import { ThemeProvider } from '@mui/styles';
// import { createTheme } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  // palette: {
  //   mode: 'dark',
  //   primary: {
  //     main: '#5893df',
  //   },
  //   secondary: {
  //     main: '#2ec5d3',
  //   },
  //   background: {
  //     default: '#192231',
  //     paper: '#24344d',
  //   },
  // },
  shape: {
    borderRadius: "8px"
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#2980B9',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#1d2532',
      paper: '#1E2E41',
    },
    text: {
      hint: '#D1D5DB',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
