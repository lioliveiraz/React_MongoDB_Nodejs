import React, { useState } from "react";
import { handlerLogOut } from "../store/actions/auth";
import { connect } from "react-redux";
import { useStyles } from "./../assets/css/Navigation/navigation";
import { useHistory } from "react-router-dom";

import { AppBar, MenuItem } from "@material-ui/core";
import { navigationLinks } from "../helpers/globalVar";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

function Navbar({ handlerLogOut, isAuthenticated }) {
  const {
    DEVELOPERS_PROFILES,
    MY_PROFILE,
    MY_WALL,
    SING_IN,
    SING_UP,
    EDIT_PROFILE,
  } = navigationLinks;
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const handleMainMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleProfileMenu = (e) => {
    setProfileMenu(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setProfileMenu(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <IconButton onClick={handleMainMenu} color="inherit">
          <MoreVertIcon />
        </IconButton>

        <Link color="inherit" href="/">
          <Typography variant="h4" color="inherit">
            NAME
          </Typography>
        </Link>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.menu}
        >
          <MenuItem onClick={handleClose}>
            <Link className={classes.links} color="inherit" href="/developers">
              <Typography color="textPrimary">{DEVELOPERS_PROFILES}</Typography>
            </Link>
          </MenuItem>

          {!isAuthenticated ? (
            <MenuItem onClick={handleClose}>
              <Link className={classes.links} color="inherit" href="/signup">
                {SING_UP}
              </Link>
            </MenuItem>
          ) : null}
        </Menu>
        {isAuthenticated ? (
          <div>
            <IconButton color="inherit" onClick={handleProfileMenu}>
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={handlerLogOut}>
              <ExitToAppIcon />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.push("/login")}
            size="small"
          >
            <Typography variant="button">{SING_IN}</Typography>
          </Button>
        )}
        <Menu
          anchorEl={profileMenu}
          open={Boolean(profileMenu)}
          onClose={handleCloseProfile}
          className={classes.menu}
        >
          <MenuItem onClick={handleCloseProfile}>
            <Link className={classes.links} color="inherit" href="/my-profile">
              <Typography color="textPrimary">{MY_PROFILE}</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseProfile}>
            <Link
              className={classes.links}
              color="inherit"
              href="/edit-profile"
            >
              <Typography color="textPrimary">{EDIT_PROFILE}</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseProfile}>
            <Link
              className={classes.links}
              color="inherit"
              href="/my-profile/wall"
            >
              {MY_WALL}
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  poolNotification: state.wall.notification,
});
export default connect(mapStateToProps, { handlerLogOut })(Navbar);
