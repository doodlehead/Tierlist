import React, { FC, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AppContext from "../contexts/AppContext";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

interface SideNavProps {
  open: boolean;
  setShowSidebar?: Function;
}

const SideNav: FC<SideNavProps> = ({ open, setShowSidebar }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setShowSidebar?.(false);
  }, [location]);

  const renderListItems = (): JSX.Element => {
    return (
      <div
        className={clsx(classes.list)}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/tierlist-maker")}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Tierlist creator"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <Drawer anchor={"left"} open={open} onClose={() => setShowSidebar?.(false)}>
      {renderListItems()}
    </Drawer>
  );
};

export default () => (
  <AppContext.Consumer>
    {({ showSidebar, setShowSidebar }) => (
      <SideNav open={showSidebar || false} setShowSidebar={setShowSidebar} />
    )}
  </AppContext.Consumer>
);
