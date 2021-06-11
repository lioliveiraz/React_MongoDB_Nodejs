import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../assets/css/App.css";
import "../assets/css/forms.css";

import Profile from "./MyProfile/Profile.jsx";
import CreateUpdateProfile from "./MyProfile/CreateUpdateProfile.jsx";
import Wall from "./MyProfile/Wall.jsx";
import DeveloperProfile from "./Developers/_Id.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Navbar from "../components/Navbar/Navbar";
import Home from "./Home.jsx";
import Developers from "./Developers/Developers.jsx";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../assets/css/App/app";
import PrivateRoute from "./../components/Routing/PrivateRoute";
import AdministratorRouter from "../components/Routing/AdministratorRouter";
import Categories from "./Adm/Categories";
import AddNewTech from "./Technology/AddNewTech";

function App({ isAuthenticated }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.nav} data-cy="nav-bar">
        <Navbar />
      </Grid>
      <Grid item xs={12} className={classes.main}>
        <Switch>
          {/*without*/}

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/developers">
            <Developers />
          </Route>
          <Route path="/developers/:id">
            <DeveloperProfile />
          </Route>

          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/" /> : <SignUp />}
          </Route>

          <PrivateRoute component={Login} exact path="/login" />
          <PrivateRoute component={SignUp} exact path="/signup" />

          <PrivateRoute component={Profile} exact path="/my-profile" />
          <PrivateRoute component={AddNewTech} exact path="/new-tech" />

          <PrivateRoute component={Wall} exact path="/my-profile/wall" />
          <PrivateRoute
            component={CreateUpdateProfile}
            exact
            path="/edit-profile"
          />

          <PrivateRoute
            component={CreateUpdateProfile}
            exact
            path="/my-profile/create-update"
          />

          <AdministratorRouter
            component={Categories}
            exact
            path="/categories"
          />

          <Route>Page Not Found</Route>
        </Switch>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
