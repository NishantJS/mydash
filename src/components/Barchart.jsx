import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function BarChart({ width, height, data }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid blue");

    const draw = () => {
      const svg = d3.select(ref.current);
      let selection = svg.selectAll("rect").data(data);
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, height - 100]);

      selection
        .transition()
        .duration(300)
        .attr("height", (d) => yScale(d))
        .attr("y", (d) => height - yScale(d));

      const barWidth = width / data?.length || 40;
      const barSpace = barWidth + 5;

      selection
        .enter()
        .append("rect")
        .attr("x", (_, i) => i * barSpace)
        .attr("y", () => height)
        .attr("width", barWidth)
        .attr("height", 0)
        .attr("fill", `hsla(${Math.random() * 360}, 100%, 50%, 1)`)
        .transition()
        .duration(300)
        .attr("height", (d) => yScale(d))
        .attr("y", (d) => height - yScale(d));

      selection
        .exit()
        .transition()
        .duration(300)
        .attr("y", () => height)
        .attr("height", 0)
        .remove();
    };
    draw();
  }, [data, height, width]);

  return <svg ref={ref}></svg>;
}

export default BarChart;
