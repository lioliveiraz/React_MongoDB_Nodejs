import React, { useState } from "react";
import Input from "../components/Base/Input";
import validateUser from "../helpers/validations/userValidator";
import { toast } from "react-toastify";
import { registerNewUser } from "./../api/requests/post";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Checkbox, FormControlLabel, Grid, Paper } from "@material-ui/core";
import { useStyles } from "./../assets/css/Signup/signup";
import Typography from "@material-ui/core/Typography";

function SignUp() {
  const [userObject, setUserObject] = useState({ adm: false });
  const [inputErrors, setInputErrors] = useState({});
  const history = useHistory();
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
    const validationErrors = validateUser(userObject);
    if (validationErrors) {
      setInputErrors(validationErrors);
    } else {
      try {
        const response = await registerNewUser(userObject);
        toast.success(response.data.msg);
        history.push("/login");
      } catch (error) {
        const apiErrors = error.response.data.errors;
        apiErrors.forEach((error) => {
          if (error.msg.includes("already registered")) {
            history.push("/login");
          }
          toast.error(error.msg);
        });
      }
    }
  };
  return (
    <Grid container className={classes.root} align="center" justify="center">
      <Paper elevation={2} className={classes.main}>
        <Grid item>
          <Typography variant="h3" color="primary" className={classes.title}>
            Sign Up
          </Typography>
        </Grid>
        <Grid>
          <form data-cy="signUp-form">
            <Grid className={classes.inputs}>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                required={true}
                getUserInput={getUserInput}
                error={inputErrors["name"] && inputErrors.name}
              />
            </Grid>

            <Grid className={classes.inputs}>
              <Input
                type="email"
                name="email"
                placeholder="johndoe@email.com"
                required={true}
                getUserInput={getUserInput}
                error={inputErrors["email"] && inputErrors.email}
              />
            </Grid>

            <Grid className={classes.inputs}>
              <Input
                type="password"
                name="password"
                required={true}
                getUserInput={getUserInput}
                error={inputErrors["password"] && inputErrors.password}
              />
            </Grid>

            <Grid className={classes.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    name="adm"
                    color="primary"
                    onClick={(e) =>
                      setUserObject({ ...userObject, adm: !userObject.adm })
                    }
                  />
                }
                label="Administrator"
                data-cy="checkbox"
              />
            </Grid>

            <Grid className={classes.inputs}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={submit}
                disabled={Object.keys(userObject).length < 3}
                data-cy="sign-up-submit-button"
              >
                {" "}
                Submit{" "}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default SignUp;
