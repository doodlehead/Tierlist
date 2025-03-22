import "./Header.scss";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import AppContext from "../contexts/AppContext";

const Header = () => {
  // const classes = useStyles();

  return (
    <AppContext.Consumer>
      {({ setShowSidebar }) => (
        <div className="header">
          <AppBar position="static" sx={{ backgroundColor: "#1A1F2C"}}>
            <Container maxWidth="xl">
              <Toolbar>
                {/* <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setShowSidebar?.(true)}
                >
                  <MenuIcon />
                </IconButton> */}
                <Typography sx={{ 
                  fontWeight: 600, 
                  fontSize: "32px", 
                  paddingTop: "8px",
                  backgroundImage: "linear-gradient(to right, #FEFEFE, #D3D7DD)",
                  color: "transparent",
                  backgroundClip: "text",
                }}>
                  RankMaster
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Header;
