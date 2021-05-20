import { getBgPerCategory } from "../../../helpers/services";
import { arc, pie, interpolate } from "d3";

export const createBar = (svg, techs, yScale, xScale) => {
  const bar = svg
    .selectAll(".bar")
    .data(techs, (entry, index) => entry.name)
    .join((enter) =>
      enter.append("rect").attr("y", (entry, index) => yScale(index))
    )
    .attr("y", (entry, index) => yScale(index))
    .attr("fill", (entry) => getBgPerCategory(entry.category))
    .attr("class", "bar")
    .attr("x", 0)
    .attr("height", yScale.bandwidth() + 0.5)
    .transition()
    .attr("width", (entry) => {
      return entry.like > 0 ? xScale(entry.like) : xScale(0.01);
    });

  return bar;
};

export const createLabel = (svg, techs, yScale) => {
  const label = svg
    .selectAll(".label")
    .data(techs, (entry) => entry.name)
    .join((enter) =>
      enter
        .append("text")
        .attr("y", (entry, index) => yScale(index) + yScale.bandwidth())
    )
    .text((entry) => `${entry.name}  (${entry.like})`)
    .attr("class", "label")
    .attr("x", 10)
    .style("fill", "smokeWhite")
    .transition()
    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() - 8);

  return label;
};

export const createGaugeChart = (svg, dimensions, like, unlike, developers) => {
  const arcGenerator = arc().innerRadius(75).outerRadius(150);
  const pieGenerator = pie()
    .startAngle(-0.5 * Math.PI)
    .endAngle(0.5 * Math.PI)
    .sort(null);

  const likeInstructions = pieGenerator([like, unlike, developers]);

  const chart = svg
    .selectAll(".slice")
    .data(likeInstructions)
    .join("path")
    .attr("class", "slice")
    .attr("fill", (instruction, index) => {
      if (index === 0) {
        return "green";
      } else if (index === 1) {
        return "red";
      } else {
        return "white";
      }
    })
    .style(
      "transform",
      `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px) `
    )
    .transition()
    .attrTween("d", function (nextInstruction) {
      //t = current state of the transition/ value between 0 and 1

      const interpolator = interpolate(this.lastInstruction, nextInstruction);
      this.lastInstruction = interpolator(1);

      return function (t) {
        return arcGenerator(interpolator(t));
      };
    });

  return chart;
};
