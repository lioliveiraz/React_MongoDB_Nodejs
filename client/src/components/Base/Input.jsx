import React from "react";

function Input(props) {
  const { type, name, label, placeholder, required, getUserInput } = props;
  return (
    <>
      <label htmlFor={name}> {label?label:name} </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onInput={(e) => getUserInput(e.target.value,name)}
      />
    </>
  );
}

export default Input;
