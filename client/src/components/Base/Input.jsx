import React from "react";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./../../assets/css/Base/input";
import { capitalize } from "./../../helpers/services";

function Input(props) {
  const { type, name, placeholder, required, getUserInput, error } = props;
  const classes = useStyles();

  return (
    <>
      <TextField
        id="standard-secondary"
        color="secondary"
        variant="outlined"
        type={type}
        name={name}
        label={capitalize(name)}
        placeholder={placeholder}
        required={required}
        onInput={(e) => getUserInput(e.target.value, name)}
        className={classes.root}
      />
      {error && error}
    </>
  );
}

export default Input;
