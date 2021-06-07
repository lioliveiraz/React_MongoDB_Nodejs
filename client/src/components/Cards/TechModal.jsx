import { Card, CardContent } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./../../assets/css/Cards/techModal";

function TechModal({ name, creator, description }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom>Technology</Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="inherit">{description}</Typography>
        <Typography variant="body2" component="p">
          {creator}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TechModal;
