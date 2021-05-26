import React from "react";
import { getBgPerCategory } from "../../helpers/services";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./../../assets/css/Board/Board";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

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
      {techArray.map(({ name, category }, index) => (
        <Grid
          key={index}
          className={classes.tech}
          style={{
            color: getBgPerCategory(category),
            border: `2px solid ${getBgPerCategory(category)}`,
          }}
        >
          <Typography variant="body1" className={classes.title}>
            {name}
          </Typography>
        </Grid>
      ))}
    </Paper>
  );
}

export default Board;
