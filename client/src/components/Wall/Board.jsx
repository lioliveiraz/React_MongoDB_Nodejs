import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./../../assets/css/Board/Board";
import Typography from "@material-ui/core/Typography";
import { Grid, Popover } from "@material-ui/core";
import TechModal from "../Cards/TechModal";

function Board({ techArray, name }) {
  const classes = useStyles();
  const [techObject, setTechObject] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const openPopOver = (tech, e) => {
    setAnchorEl(e.currentTarget);
    setTechObject(tech);
  };

  return (
    <Paper elevation={3} className={chooseClass(name) + " " + classes.root}>
      <Typography variant="h4" className={classes.title}>
        {name}
      </Typography>
      {techArray.map((tech, index) => (
        <Grid
          key={index}
          className={classes.tech}
          style={{
            color: tech.category.color,
            border: `2px solid ${tech.category.color}`,
          }}
          onMouseEnter={(e) => openPopOver(tech, e)}
          onMouseLeave={() => setAnchorEl(null)}
        >
          <Typography variant="body1" className={classes.title}>
            {tech.name}
          </Typography>
          <Popover
            className={`${classes.popover} ${classes.paper}`}
            classes={{
              paper: classes.paper,
            }}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            disableRestoreFocus
          >
            {techObject ? (
              <>
                <TechModal
                  name={techObject.name}
                  creator={techObject.creator}
                  description={techObject.description}
                />
              </>
            ) : null}
          </Popover>
        </Grid>
      ))}
    </Paper>
  );
}

export default Board;
