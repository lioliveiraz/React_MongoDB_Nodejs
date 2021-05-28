import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../../store/actions/profile";
import { calculatePercentage } from "../../../helpers/services";
import useResizeObserver from "../../../helpers/useReciseObserver";
import { select } from "d3";
import { createGaugeChart } from "../helpers/gaugeChartElements";

function GaugeChart({ developers, getAllProfiles, tech }) {
  const [likePercentage, setLikePercentage] = useState(0);
  const [name, setName] = useState(0);

  const svgLikeRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(async () => {
    await getAllProfiles();
    if (tech) {
      const { like, name } = tech;
      setName(name);
      setLikePercentage(calculatePercentage(developers, like));
    }
  }, [tech]);

  useEffect(() => {
    if (!dimensions || !tech) return;
    const { like, unlike } = tech;
    const svg = select(svgLikeRef.current);

    createGaugeChart(svg, dimensions, like, unlike, developers);
  }, [developers, dimensions, tech]);

  return (
    <div>
      <div
        ref={wrapperRef}
        style={{ height: "50vh", background: "red", width: "30%" }}
      >
        <h1>{name}</h1>
        <svg
          ref={svgLikeRef}
          style={{ height: "100%", background: "pink" }}
        ></svg>
      </div>
    </div>
  );
}

const MapStateToProps = (state) => {
  return {
    developers: state.profile.profiles.length,
  };
};

export default connect(MapStateToProps, { getAllProfiles })(GaugeChart);
