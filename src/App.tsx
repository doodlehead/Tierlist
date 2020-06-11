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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";

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
            <Router>
              <Switch>
                <Route path="/Tierlist/create">
                  <ListMaker />
                </Route>
                <Route path="/Tierlist/">
                  <Homepage />
                </Route>
              </Switch>
              <SideNav />
            </Router>
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
