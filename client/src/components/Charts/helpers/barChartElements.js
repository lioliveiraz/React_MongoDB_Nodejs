import { getBgPerCategory } from "../../../helpers/services";

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
    .style("fill", "black")
    .transition()
    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() - 5);

  return label;
};
