import React from "react";
import "./Header.scss";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  //Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppContext from "../contexts/AppContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    "@media only screen and (min-width: 768px)": {
      title: {
        flexGrow: 1,
      },
    },
  })
);

const Header = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {({ setShowSidebar }) => (
        <div className="header">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSidebar?.(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                Tierlist Maker
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Header;
