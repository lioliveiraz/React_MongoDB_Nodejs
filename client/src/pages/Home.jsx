import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { buildCommonWall } from "../store/actions/wall";
import Wall from "../components/Wall/Wall";
import Header from "./../components/Header/Header";
import { buildSurvey } from "./../store/actions/survey";
import BarChart from "../components/RacingBar/BarChart";
import { categoryName } from "../helpers/globalVar";

function Home({
  buildCommonWall,
  wall,
  buildSurvey,
  survey: {
    categories,
    techs,
    frameworks,
    libraries,
    testing,
    databases,
    collaboration,
    languages,
  },
}) {
  const [chartCategory, setChartCategory] = useState();
  const { LIBRARY, FRAMEWORK, DATABASE, COLLABORATION, TESTING, LANGUAGE } =
    categoryName;
  useEffect(() => {
    buildCommonWall();
  }, []);

  useEffect(() => {
    buildSurvey();
  }, []);

  const getCategoryArr = (cat) => {
    switch (cat) {
      case LIBRARY:
        return libraries;
      case FRAMEWORK:
        return frameworks;
      case DATABASE:
        return databases;
      case COLLABORATION:
        return collaboration;
      case TESTING:
        return testing;
      case LANGUAGE:
        return languages;
      default:
        return [];
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Wall wall={wall} />

      {categories.map((category) => (
        <button key={category} onClick={() => setChartCategory(category)}>
          {category}
        </button>
      ))}

      <BarChart techs={techs} name="General Technologies" />
      <BarChart techs={getCategoryArr(chartCategory)} name={chartCategory} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wall: state.wall,
    survey: state.survey,
  };
};

export default connect(mapStateToProps, { buildCommonWall, buildSurvey })(Home);
