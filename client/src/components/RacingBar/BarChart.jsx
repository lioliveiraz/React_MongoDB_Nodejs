import React, { useEffect, useRef, useState } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useReciseObserver";
import { getBgPerCategory } from "../../helpers/services";

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
      .range([0, dimensions.width]);

    svg
      .selectAll(".bar")
      .data(techs, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", (entry) => getBgPerCategory(entry.category))
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth() + 0.5)
      .transition()
      .attr("width", (entry) => {
        return entry.like > 0 ? xScale(entry.like) : xScale(0.01);
      })
      .attr("y", (entry, index) => yScale(index));

    svg
      .selectAll(".label")
      .data(techs, (entry) => entry.name)
      .join((enter) =>
        enter
          .append("text")
          .attr("y", (entry, index) => yScale(index) + yScale.bandwidth())
      )
      .text((entry) => entry.name)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth());
  }, [techs, dimensions]);

  return (
    <div>
      <h1>{name}</h1>

      <div ref={wrapperRef} style={{ width: "50%" }}>
        <svg ref={svgRef}> </svg>
      </div>
    </div>
  );
}

export default BarChart;
