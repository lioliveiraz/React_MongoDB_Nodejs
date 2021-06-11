import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useStyles } from "../assets/css/Login/login";

import { handlerLogin } from "../store/actions/auth";
import loginValidator from "../helpers/validations/loginValidator";
import Input from "./../components/Base/Input";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import padlock from "../assets/images/padlock.svg";

function Login({ handlerLogin, errors }) {
  const [userObject, setUserObject] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  const classes = useStyles();

  const getUserInput = (value, name) => {
    setInputErrors({});
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationErrors = loginValidator(userObject);
    if (validationErrors) {
      setInputErrors(validationErrors);
    } else {
      handlerLogin(userObject);
    }
  };

  useEffect(() => {
    toast.error(errors);
  }, [errors]);

  return (
    <Grid
      container
      component="main"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      {" "}
      <Grid item xs={10} sm={8} md={4} className={classes.main}>
        <Paper elevation={3} className={classes.paper}>
          <img src={padlock} alt="padlock" className={classes.image} />
          <Typography variant="h3" color="primary" className={classes.title}>
            LOGIN
          </Typography>

          <form className={classes.form} data-cy="login-form">
            <Grid item className={classes.input}>
              <Input
                type="email"
                name="email"
                placeholder="johndow@email.com"
                required={true}
                getUserInput={getUserInput}
                error={inputErrors["email"] && inputErrors["email"]}
              />
            </Grid>
            <Grid item className={classes.input}>
              <Input
                type="password"
                name="password"
                required={true}
                getUserInput={getUserInput}
                error={inputErrors["password"] && inputErrors["password"]}
              />
            </Grid>

            <Button
              onClick={submit}
              variant="contained"
              color="secondary"
              className={classes.button}
              data-cy="button-submit"
              disabled={Object.keys(userObject).length != 2}
            >
              LogIn
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { handlerLogin })(Login);
