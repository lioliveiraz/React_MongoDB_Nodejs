export const createBar = (svg, techs, yScale, xScale) => {
  const bar = svg
    .selectAll(".bar")
    .data(techs, (entry, index) => entry.name)
    .join((enter) =>
      enter.append("rect").attr("y", (entry, index) => yScale(index))
    )
    .attr("y", (entry, index) => yScale(index))
    .attr("fill", (entry) => entry.category.color)
    .attr("class", "bar")
    .attr("x", 0)
    .attr("height", yScale.bandwidth() + 0.5)
    .transition()
    .attr("width", (entry) => {
      return entry.like > 0 ? xScale(entry.like) : xScale(0.01);
    });

  return bar;
};

export const createLabel = (svg, techs, yScale, xScale) => {
  const label = svg
    .selectAll(".label")
    .data(techs, (entry) => entry.name)
    .join("text")
    .attr("class", "label")
    .attr("x", 10)
    .attr("fill", "white")
    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((entry) => `${entry.name}`);

  return label;
};

export const createLabelLikes = (svg, techs, yScale, xScale) => {
  const label = svg
    .selectAll(".value")
    .data(techs)
    .join("text")
    .attr("class", "value")
    .attr("x", (entry) => xScale(entry.like) - 40)
    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .attr("fill", "white")
    .text((entry) => (entry.like === 0 ? null : `💕 ${entry.like}`))
    .transition()
    .attr("width", (entry) => {
      return entry.like > 0 ? xScale(entry.like) - 20 : xScale(0.01);
    });

  return label;
};
