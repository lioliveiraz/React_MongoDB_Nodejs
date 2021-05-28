import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) {
  return (
    <Route {...rest}>
      {!isAuthenticated ? <Redirect to="/" /> : <Component {...rest} />}
    </Route>
  );
}

const MapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(MapStateToProps)(PrivateRoute);
