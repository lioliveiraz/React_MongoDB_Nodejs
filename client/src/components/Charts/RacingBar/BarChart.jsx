import React, { useEffect, useRef } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../../helpers/useReciseObserver";
import {
  createBar,
  createLabel,
  createLabelLikes,
} from "../helpers/barChartElements";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./../../../assets/css/charts/barChart";
import { Grid } from "@material-ui/core";

function BarChart({ techs, name }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const classes = useStyles();

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    techs.sort((a, b) => b.like - a.like);

    const yScale = scaleBand()
      .padding(0.1)
      .domain(techs.map((value, index) => index))
      .range([0, dimensions.height + 5]);

    const xScale = scaleLinear()
      .domain([0, max(techs, (entry) => entry.like)])
      .range([0, dimensions.width - (dimensions.width / 100) * 20]);

    createBar(svg, techs, yScale, xScale);
    createLabel(svg, techs, yScale, xScale);
    createLabelLikes(svg, techs, yScale, xScale);
  }, [techs, dimensions]);

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant="h3" color="secondary" className={classes.title}>
          {name}
        </Typography>
      </Grid>

      <Grid item ref={wrapperRef} className={classes.svgWrapper}>
        <svg ref={svgRef} className={classes.svg}></svg>
      </Grid>
    </Grid>
  );
}

export default BarChart;
