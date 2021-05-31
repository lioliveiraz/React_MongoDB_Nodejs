import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useStyles } from "../assets/css/Login/login";

import { handlerLogin } from "../store/actions/auth";
import Input from "./../components/Base/Input";
import BaseButton from "../components/Base/BaseButton";
import { Grid } from "@material-ui/core";

function Login({ handlerLogin, errors }) {
  const [userObject, setUserObject] = useState({});
  const classes = useStyles();

  const getUserInput = (value, name) => {
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    handlerLogin(userObject);
  };

  useEffect(() => {
    toast.error(errors);
  }, [errors]);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={12} className={classes.image}>
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          elevation={6}
          square
          className={classes.paper}
        >
          <h1>Login</h1>
          <form className="h-formRoot">
            <Input
              type="email"
              name="email"
              placeholder="johndow@email.com"
              required={true}
              getUserInput={getUserInput}
            />
            <Input
              type="password"
              name="password"
              required={true}
              getUserInput={getUserInput}
            />
            <BaseButton value="LogIn" handleClick={submit} color="primary" />
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { handlerLogin })(Login);
