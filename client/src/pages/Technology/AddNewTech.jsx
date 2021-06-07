import React from "react";
import NewTechForm from "../../components/Technology/NewTechForm";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function AddNewTech(props) {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h3"> New Tech</Typography>
        <NewTechForm />
      </Grid>
    </Grid>
  );
}

export default AddNewTech;
