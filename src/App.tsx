import { useState, useEffect, ReactElement } from "react";
import "./App.scss";
import ListMaker from "./pages/ListMaker";
import Header from "./components/Header";
// import SideNav from "./components/SideNav";
import AppContext from "./contexts/AppContext";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Homepage from "./pages/Homepage";
import { Snackbar } from "@mui/material";
import Alert from "@mui/lab/Alert";
import { SnackbarMessage } from "./utils/common";
import CssBaseline from '@mui/material/CssBaseline';

const App = (): ReactElement => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<SnackbarMessage>({
    text: "",
    severity: "success",
  });

  const handleCloseMessage = (): void => {
    setMessage({ text: "", severity: message.severity });
  };

  // const handleSnackbarClose = (event: SyntheticEvent, reason: string): void => {
  //   if (reason === "clickaway") return;
  //   setShowSnackbar(false);
  // };

  // Show the snackbar when there's a message available
  useEffect(() => {
    if (message?.text) {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [message]);

  // TODO: set up actual routes
  return (
    <div id="app">
      <CssBaseline />
      <AppContext.Provider
        value={{ showSidebar, setShowSidebar, setMessage }}
      >
        <Header />
        <div id="appContent">
          <ListMaker />
        </div>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          // onClose={handleSnackbarClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleCloseMessage}
            severity={message?.severity}
          >
            {message?.text}
          </Alert>
        </Snackbar>
      </AppContext.Provider>
    </div>
  );
};

export default App;
