import React, { useState } from "react";
import { handlerLogOut } from "../store/actions/auth";
import { connect } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { navigationLinks } from "../helpers/globalVar";
import BaseButton from "./Base/BaseButton";
import { useStyles } from "./../assets/css/Navigation/navigation";
import { useHistory } from "react-router-dom";

import SvgIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";

function Navbar({ handlerLogOut, isAuthenticated, poolNotification }) {
  const { DEVELOPERS_PROFILES, MY_PROFILE, MY_WALL, SING_IN, SING_UP, LOGOUT } =
    navigationLinks;

  const classes = useStyles();
  const history = useHistory();

  return (
    <Breadcrumbs className={classes.root}>
      <Link className={classes.links} color="inherit" href="/">
        <HomeIcon color="secondary" />
      </Link>
      <Link className={classes.links} color="inherit" href="/developers">
        <Typography color="textPrimary">{DEVELOPERS_PROFILES}</Typography>
      </Link>
      {isAuthenticated ? (
        <Breadcrumbs className={classes.subnav}>
          <Link className={classes.links} color="inherit" href="/my-profile">
            <Typography color="textPrimary">{MY_PROFILE}</Typography>
          </Link>

          <Link
            className={classes.links}
            color="inherit"
            href="/my-profile/wall"
          >
            {MY_WALL}({poolNotification})
          </Link>

          <BaseButton
            color="secondary"
            value={LOGOUT}
            handleClick={handlerLogOut}
            className={classes.button}
          />
        </Breadcrumbs>
      ) : (
        <Breadcrumbs className={classes.subnav}>
          <Link className={classes.links} color="inherit" href="/signup">
            {SING_UP}
          </Link>
          <BaseButton
            value={SING_IN}
            color="secondary"
            handleClick={() => history.push("/login")}
            className={classes.button}
          />
        </Breadcrumbs>
      )}{" "}
    </Breadcrumbs>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  poolNotification: state.wall.notification,
});
export default connect(mapStateToProps, { handlerLogOut })(Navbar);
