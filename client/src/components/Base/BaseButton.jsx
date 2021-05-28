import React from "react";
import Button from "@material-ui/core/Button";

function BaseButton({ value, handleClick, color, variant }) {
  return (
    <Button color={color} onClick={handleClick} variant={variant}>
      {value}
    </Button>
  );
}

export default BaseButton;
