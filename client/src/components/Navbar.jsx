import React from "react";
import { Link } from "react-router-dom";
import { handlerLogOut } from "../store/actions/auth";
import { connect } from "react-redux";

function Navbar({ handlerLogOut, isAuthenticated }) {
  return (
    <nav style={{ background: "green", padding: "5px" }}>
      <ul style={{ display: "flex" }}>
        <li style={{ margin: "10px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin: "10px" }}>
          {" "}
          <Link to="/developers">Developers</Link>
        </li>

        {isAuthenticated ? (
          <>
            <li style={{ margin: "10px" }}>
              <Link to="/my-profile">my profile</Link>
            </li>
            <li style={{ margin: "10px" }}>
              <Link to="/my-profile/wall">my wall</Link>
            </li>
            <li style={{ margin: "10px" }} onClick={handlerLogOut}>
              logout
            </li>
          </>
        ) : (
          <>
            <li style={{ margin: "10px" }}>
              <Link to="/signup">sign up</Link>
            </li>
            <li style={{ margin: "10px" }}>
              <Link to="/login">login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { handlerLogOut })(Navbar);
