import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAdm, loading, ...rest }) {
  return (
    <Route {...rest}>
      {!isAdm ? <Redirect to="/" /> : <Component {...rest} />}
    </Route>
  );
}

const MapStateToProps = (state) => {
  return {
    isAdm: state.auth.adm,
  };
};

export default connect(MapStateToProps)(PrivateRoute);
