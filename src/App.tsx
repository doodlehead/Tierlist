import React, { useState } from "react";
//import * as logo from './logo.svg';
import "./App.scss";
//const logo = require("./logo.svg") as string;
import ListMaker from "./pages/ListMaker";
import Header from "./components/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SideNav from "./components/SideNav";
import AppContext from "./contexts/AppContext";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App = (): React.ReactElement => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div id="app">
      <ThemeProvider theme={darkTheme}>
        <AppContext.Provider value={{ showSidebar, setShowSidebar }}>
          <Header />
          <div id="appContent">
            <ListMaker />
            <SideNav />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
      {/* TODO: add routing here */}
    </div>
  );
};

export default App;
