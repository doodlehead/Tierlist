import * as React from "react";
//import * as logo from './logo.svg';
import "./App.scss";
//const logo = require("./logo.svg") as string;
import ListMaker from "./pages/ListMaker";
import Header from "./components/Header";

function App() {
  return (
    <div id="app">
      <Header />
      <div id="appContent">
        <ListMaker />
      </div>
      {/* TODO: add routing here */}
    </div>
  );
}

export default App;
