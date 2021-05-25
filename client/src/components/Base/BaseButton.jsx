import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function BaseButton({ value, handleClick, color }) {
  return (
    <Button variant="contained" color={color} onClick={handleClick}>
      <Typography color="textPrimary">{value}</Typography>
    </Button>
  );
}

export default BaseButton;
