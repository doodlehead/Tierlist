import React, { FC, useEffect, useContext } from "react";
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
//import InboxIcon from "@material-ui/icons/MoveToInbox";
//import MailIcon from "@material-ui/icons/Mail";
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

const SideNav: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(AppContext);

  useEffect(() => {
    setShowSidebar?.(false);
  }, [location]);

  const renderListItems = (): JSX.Element => {
    return (
      <div className={clsx(classes.list)} role="presentation">
        <List>
          <ListItem button onClick={() => history.push("/Tierlist")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/Tierlist/create")}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Tierlist creator"} />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };

  return (
    <Drawer
      anchor={"left"}
      open={showSidebar}
      onClose={() => setShowSidebar?.(false)}
    >
      {renderListItems()}
    </Drawer>
  );
};

export default SideNav;
