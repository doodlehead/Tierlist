import { FC, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Home, NoteAdd } from "@mui/icons-material";
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
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/Tierlist/create")}>
            <ListItemIcon>
              <NoteAdd />
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
