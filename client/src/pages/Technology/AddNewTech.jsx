import React from "react";
import NewTechForm from "../../components/Technology/NewTechForm";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./../../assets/css/Technologies/newTechForm";

function AddNewTech() {
  const classes = useStyles();

  return (
    <Grid container justify="center" align="center" className={classes.root}>
      <NewTechForm />
    </Grid>
  );
}

export default AddNewTech;
