import React from "react";
import { connect } from "react-redux";
import { MenuItem } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { navigationLinks } from "../../helpers/globalVar";

function AdmLinks({ isAdm, handleClose, classes }) {
  const { CATEGORIES } = navigationLinks;

  if (!isAdm) return null;

  return (
    <>
      <MenuItem onClick={handleClose}>
        <Link className={classes.links} color="inherit" href="/categories">
          <Typography color="textPrimary">{CATEGORIES}</Typography>
        </Link>
      </MenuItem>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAdm: state.auth.adm,
  };
};

export default connect(mapStateToProps)(AdmLinks);
