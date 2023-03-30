import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Menu,
  MenuItem,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@material-ui/core";
import {
  HomeOutlined,
  FastfoodOutlined,
  KitchenOutlined,
  EmojiFoodBeverageOutlined,
  WatchLaterOutlined,
  WorkOutlineOutlined,
  ShoppingCartOutlined,
  PeopleAltOutlined,
} from "@material-ui/icons";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "none",
    boxShadow: "none",
    color: "black",
    position: "fixed",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: "60px",
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(12),
  },
  sectionDesktop: {
    display: "none",

    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const SideBar = ({ children }) => {
  const classes = useStyles();
  let history = useHistory();
  const userName = JSON.parse(localStorage.getItem("user"))?.fName;
  const image = JSON.parse(localStorage.getItem("user"))?.image;

  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const userType = JSON.parse(localStorage.getItem("user"))?.type;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/loginChef");
  };
  const StyledMenu = withStyles({
    paper: {
      boxShadow: "border-box",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const editProfile = () => {
    history.push(`/edit/${userType}/${userId}`);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <List>
            <ListItem button>
              <Typography variant={"h6"}>My Kitchen</Typography>
            </ListItem>
          </List>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src={image} />
              <div style={{ paddingLeft: "15px", fontSize: "15px" }}>
                {userName}
              </div>
            </IconButton>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push("/profile")}>
                Profile
              </MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button key={"avatar"}>
            <Avatar alt="Remy Sharp" src={image} />
            <ListItemText
              primary={`${userName}`}
              style={{ paddingLeft: "20px" }}
            />
          </ListItem>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/dashboard"
          >
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/restaurants"
          >
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary={"Restaurants"} />
            </ListItem>
          </Link>
          <Link
            to="/recipesList"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <FastfoodOutlined />
              </ListItemIcon>
              <ListItemText primary={"Recipes"} />
            </ListItem>
          </Link>
          {userType === "chef" ? (
            <>
              <Link
                to="/chefsList"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <KitchenOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Chefs"} />
                </ListItem>
              </Link>
              <Link
                to="/workersList"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <WorkOutlineOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Workers"} />
                </ListItem>
              </Link>
              <Link
                to="/ingredients"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <EmojiFoodBeverageOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Ingredients"} />
                </ListItem>
              </Link>
              <Link
                to="/orders"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <ShoppingCartOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Orders"} />
                </ListItem>
              </Link>
              <Link
                to="/shifts"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <WatchLaterOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Shifts"} />
                </ListItem>
              </Link>
              <Link
                to="/user/form"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAltOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Add User"} />
                </ListItem>
              </Link>
            </>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default SideBar;
