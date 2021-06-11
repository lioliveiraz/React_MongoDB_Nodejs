import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./../../assets/css/Base/input";
import { capitalize } from "./../../helpers/services";
import Typography from "@material-ui/core/Typography";

function Input(props) {
  const { type, name, placeholder, required, getUserInput, error } = props;
  const classes = useStyles();

  return (
    <>
      <TextField
        inputProps={{
          "data-cy": `input-${name}`,
        }}
        id="standard-secondary"
        color="secondary"
        variant="outlined"
        type={type}
        name={name}
        label={capitalize(name)}
        placeholder={placeholder}
        required={required}
        onInput={(e) => {
          getUserInput(e.target.value, name);
        }}
        className={classes.root}
        data-cy={`input-${name}-wrapper`}
      />
      {error && (
        <Typography
          variant="body1"
          data-cy="input-error-message"
          className={classes.errorMessage}
        >
          {error}
        </Typography>
      )}
    </>
  );
}

export default Input;
