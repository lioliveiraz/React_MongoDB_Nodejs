import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { buildCommonWall } from "../store/actions/wall";
import Wall from "../components/Wall/Wall";
import { buildSurvey } from "./../store/actions/survey";
import BarChart from "../components/Charts/RacingBar/BarChart";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../assets/css/Home/home";
import Button from "@material-ui/core/Button";
import { getCategories } from "./../store/actions/categories";

function Home({
  buildCommonWall,
  getCategories,
  wall,
  buildSurvey,
  categories,
  survey: { techs },
}) {
  const [chartCategory, setChartCategory] = useState();
  const classes = useStyles();

  useEffect(() => {
    buildCommonWall();
    getCategories();
  }, [buildCommonWall, getCategories]);

  useEffect(() => {
    buildSurvey();
  }, [wall, buildSurvey]);

  const getCategoryArr = (cat) => {
    return techs.filter((el) => el.category.name === cat);
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
      </Grid>
      <Grid item xs={12} md={6} className={classes.filter}>
        {categories.map(({ name, color }) => (
          <Grid item key={name}>
            <Button
              key={name}
              variant={
                getCategoryArr(name).length < 1 ? "contained" : "outlined"
              }
              style={{
                color: getCategoryArr(name).length < 1 ? "gray" : color,
                border:
                  getCategoryArr(name).length < 1
                    ? "gray"
                    : `1px solid ${color}`,
              }}
              disabled={getCategoryArr(name).length < 1}
              className={classes.buttons}
              onClick={() => {
                setChartCategory(name);
              }}
            >
              {name}
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
    </Grid>

    /*  
    
       
       
        <ul>
          {getCategoryArr(chartCategory).map((value) => (
            <li key={value._id} onClick={() => setSelectedTech(value)}>
              {value.name}
            </li>
          ))}
        </ul>
        {selectedTech ? <GaugeChart tech={selectedTech} /> : null} 
              </Grid>*/
  );
}

const mapStateToProps = (state) => {
  return {
    wall: state.wall,
    survey: state.survey,
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps, {
  buildCommonWall,
  buildSurvey,
  getCategories,
})(Home);
