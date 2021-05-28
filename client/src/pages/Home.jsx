import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { buildCommonWall } from "../store/actions/wall";
import Wall from "../components/Wall/Wall";
import Header from "./../components/Header/Header";
import { buildSurvey } from "./../store/actions/survey";
import BarChart from "../components/Charts/RacingBar/BarChart";
import { categoryName } from "../helpers/globalVar";
import GaugeChart from "../components/Charts/GaugeChart/GaugeChart";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../assets/css/Home/home";
import Button from "@material-ui/core/Button";
import { getBgPerCategory } from "../helpers/services";

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
  const [selectedTech, setSelectedTech] = useState();
  const classes = useStyles();
  const { LIBRARY, FRAMEWORK, DATABASE, COLLABORATION, TESTING, LANGUAGE } =
    categoryName;
  useEffect(() => {
    buildCommonWall();
  }, []);

  useEffect(() => {
    buildSurvey();
  }, [wall]);

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
    <Grid container className={classes.root} direction="column">
      <Grid item className={classes.wall}>
        <Wall wall={wall} />
      </Grid>

      <Grid container className={classes.chartsRoot}>
        <Grid item xs={12} md={6} className={classes.chart}>
          <BarChart techs={techs} name="Technologies" />
        </Grid>

        <Grid item xs={12} md={6} className={classes.filter}>
          {categories.map((category) => (
            <Grid item key={category}>
              <Button
                key={category}
                variant="outlined"
                style={{
                  color: getBgPerCategory(category),
                  border: `1px solid ${getBgPerCategory(category)}`,
                }}
                className={classes.buttons}
                onClick={() => {
                  setChartCategory(category);
                }}
              >
                {category}
              </Button>
            </Grid>
          ))}
          {chartCategory && (
            <Grid item xs={12} md={6} className={classes.chart}>
              <BarChart
                techs={getCategoryArr(chartCategory)}
                name={chartCategory}
              />
            </Grid>
          )}
        </Grid>
        {/* 
        <ul>
          {getCategoryArr(chartCategory).map((value) => (
            <li key={value._id} onClick={() => setSelectedTech(value)}>
              {value.name}
            </li>
          ))}
        </ul>
        {selectedTech ? <GaugeChart tech={selectedTech} /> : null} */}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    wall: state.wall,
    survey: state.survey,
  };
};

export default connect(mapStateToProps, { buildCommonWall, buildSurvey })(Home);
