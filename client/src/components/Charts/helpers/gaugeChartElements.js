import { arc, pie, interpolate } from "d3";

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
