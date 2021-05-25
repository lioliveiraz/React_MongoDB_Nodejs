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
import Navbar from "./../components/Navbar";
import Home from "./Home.jsx";
import Developers from "./Developers/Developers.jsx";
import Footer from "./../components/Footer";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../assets/css/App/app";

function App({ isAuthenticated }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={12} className={classes.nav}>
        <Navbar />
      </Grid>

      <Grid item sm={12} className={classes.main}>
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

          {/*auth*/}
          <Route exact path="/my-profile">
            {!isAuthenticated ? <Redirect to="/" /> : <Profile />}
          </Route>
          <Route path="/my-profile/wall">
            {!isAuthenticated ? <Redirect to="/" /> : <Wall />}
          </Route>
          <Route path="/my-profile/create-update">
            {!isAuthenticated ? <Redirect to="/" /> : <CreateUpdateProfile />}
          </Route>
        </Switch>
      </Grid>
      <Grid item sm={12} className={classes.footer}>
        <Footer />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
