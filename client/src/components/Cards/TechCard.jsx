import React, { useState } from "react";
import { Grid, Popover } from "@material-ui/core";
import { useStyles } from "./../../assets/css/Board/Board";
import Typography from "@material-ui/core/Typography";
import TechModal from "../Cards/TechModal";

function TechCard({ tech, index }) {
  const classes = useStyles();
  const [techObject, setTechObject] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopOver = (tech, e) => {
    setAnchorEl(e.currentTarget);
    setTechObject(tech);
  };
  return (
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
  );
}

export default TechCard;
