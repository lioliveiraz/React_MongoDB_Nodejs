import React from "react";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { MenuItem } from "@material-ui/core";
import { navigationLinks } from "../../helpers/globalVar";

function ProfileMenu({ profileMenu, setProfileMenu, classes }) {
  const { MY_PROFILE, MY_WALL, EDIT_PROFILE } = navigationLinks;
  const handleCloseProfile = () => {
    setProfileMenu(null);
  };
  return (
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
        <Link className={classes.links} color="inherit" href="/edit-profile">
          <Typography color="textPrimary">{EDIT_PROFILE}</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseProfile}>
        <Link className={classes.links} color="inherit" href="/my-profile/wall">
          {MY_WALL}
        </Link>
      </MenuItem>
    </Menu>
  );
}

export default ProfileMenu;
