import React from "react";
import Board from "./Board";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../../assets/css/Wall/wall";
import Paper from "@material-ui/core/Paper";

function Wall({ wall }) {
  const classes = useStyles();
  const { hot, cold, pool, warm } = wall;

  return (
    <Grid
      container
      spacing={3}
      justify="center"
      className={classes.root}
      direction="column"
    >
      <Paper className={classes.wall} elevation={3}>
        <Grid item className={classes.boards}>
          <Grid item className={classes.column}>
            <Board techArray={cold} name="cold" />
          </Grid>

          <Grid item className={classes.column}>
            <Board techArray={warm} name="warm" />
          </Grid>

          <Grid item className={classes.column}>
            <Board techArray={hot} name="hot" />
          </Grid>
        </Grid>

        <Grid item className={classes.pool}>
          <Board techArray={pool} name="pool" />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Wall;
