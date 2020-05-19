import * as React from "react";
//import * as logo from './logo.svg';
import "./App.scss";
//const logo = require("./logo.svg") as string;
import ListMaker from "./pages/ListMaker";
import Header from "./components/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <div id="app">
      <ThemeProvider theme={darkTheme}>
        <Header />
        <div id="appContent">
          <ListMaker />
        </div>
      </ThemeProvider>
      {/* TODO: add routing here */}
    </div>
  );
}

export default App;
