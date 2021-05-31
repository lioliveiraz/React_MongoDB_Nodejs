import React from "react";
import TextField from "@material-ui/core/TextField";

function Input(props) {
  const { type, name, placeholder, required, getUserInput, error } = props;

  return (
    <>
      <TextField
        id="standard-secondary"
        color="secondary"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onInput={(e) => getUserInput(e.target.value, name)}
      />
      {error && error}
    </>
  );
}

export default Input;
