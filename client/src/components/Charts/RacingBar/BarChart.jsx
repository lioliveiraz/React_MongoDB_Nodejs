import React, { useEffect, useRef, useState } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../../helpers/useReciseObserver";
import { createBar, createLabel } from "../helpers/barChartElements";

function BarChart({ techs, name }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    techs.sort((a, b) => b.like - a.like);
    const yScale = scaleBand()
      .padding(0.1)
      .domain(techs.map((value, index) => index))
      .range([0, dimensions.height]);

    const xScale = scaleLinear()
      .domain([0, max(techs, (entry) => entry.like)])
      .range([0, dimensions.width - (dimensions.width / 100) * 20]);

    createBar(svg, techs, yScale, xScale);
    createLabel(svg, techs, yScale, xScale);
  }, [techs, dimensions]);

  return (
    <div>
      <h1>{name}</h1>

      <div ref={wrapperRef} style={{ height: "30vh" }}>
        <svg ref={svgRef} style={{ height: "100%" }}>
          {" "}
        </svg>
      </div>
    </div>
  );
}

export default BarChart;
