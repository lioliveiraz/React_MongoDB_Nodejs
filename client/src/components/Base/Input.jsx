import React from "react";
import TextField from "@material-ui/core/TextField";
import { capitalize } from "../../helpers/services";

function Input(props) {
  const { type, name, label, placeholder, required, getUserInput } = props;

  return (
    <>
      <TextField
        id="standard-secondary"
        label={label ? capitalize(label) : capitalize(name)}
        color="secondary"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onInput={(e) => getUserInput(e.target.value, name)}
      />
    </>
  );
}

export default Input;
