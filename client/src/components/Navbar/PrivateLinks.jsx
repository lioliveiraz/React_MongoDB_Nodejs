import React from "react";
import { connect } from "react-redux";
import { MenuItem } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { navigationLinks } from "../../helpers/globalVar";

function PrivateLinks({ isAuthenticated, classes, handleClose }) {
  const { ADD_NEWTECH } = navigationLinks;

  if (!isAuthenticated) return null;

  return (
    <MenuItem onClick={handleClose}>
      <Link className={classes.links} color="inherit" href="/new-tech">
        <Typography color="textPrimary">{ADD_NEWTECH}</Typography>
      </Link>
    </MenuItem>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(PrivateLinks);
