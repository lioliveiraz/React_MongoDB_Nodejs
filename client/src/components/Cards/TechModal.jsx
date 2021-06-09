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
        <Typography variant="h5" component="h2" data-cy="modal-title">
          {name}
        </Typography>
        <Typography color="inherit" data-cy="modal-description">
          {description}
        </Typography>
        <Typography variant="body2" component="p" data-cy="modal-creator">
          {creator}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TechModal;
