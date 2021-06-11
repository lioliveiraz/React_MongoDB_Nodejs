import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./../../assets/css/Board/Board";
import Typography from "@material-ui/core/Typography";
import TechCard from "./../Cards/TechCard";

function Board({ techArray, name }) {
  const classes = useStyles();

  const chooseClass = (columnName) => {
    switch (columnName) {
      case "cold":
        return classes.rootCold;
      case "hot":
        return classes.rootHot;
      case "warm":
        return classes.rootWarm;
      default:
        return classes.rootPool;
    }
  };

  return (
    <Paper elevation={3} className={chooseClass(name) + " " + classes.root}>
      <Typography variant="h4" className={classes.title}>
        {name}
      </Typography>
      {techArray.map((tech, index) => (
        <TechCard tech={tech} index={index} key={index} />
      ))}
    </Paper>
  );
}

export default Board;
