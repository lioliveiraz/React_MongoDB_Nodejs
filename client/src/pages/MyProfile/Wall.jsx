import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  updateWall,
  updateVotes,
  buildPersonalWall,
} from "./../../store/actions/myWall";
import { findColumn, getBgPerCategory } from "../../helpers/services";
import { buildCommonWall } from "../../store/actions/wall";
import { buildSurvey } from "./../../store/actions/survey";
import Paper from "@material-ui/core/Paper";
import { useStylesMyWall } from "./../../assets/css/MyWall/myWall";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./../../assets/css/Board/Board";

function Wall({
  buildPersonalWall,
  wall,
  token,
  updateWall,
  updateVotes,
  buildCommonWall,
  buildSurvey,
}) {
  const [columnsUpdated, updateColumns] = useState([]);
  const classes = useStylesMyWall();
  const wallClasses = useStyles();

  const chooseClass = (columnName) => {
    switch (columnName) {
      case "cold":
        return wallClasses.rootCold;
      case "hot":
        return wallClasses.rootHot;
      case "warm":
        return wallClasses.rootWarm;
      default:
        return wallClasses.rootPool;
    }
  };

  useEffect(() => {
    async function getWall() {
      buildPersonalWall(token);
    }
    getWall();
  }, []);

  useEffect(() => {
    updateColumns(Object.entries(wall.techs));
  }, [wall]);

  const handleOnDropEnd = (result) => {
    console.log(result);
    if (result.destination) {
      const columns = Array.from(columnsUpdated);
      const dropColumnName = result.destination.droppableId;
      const dragColumnName = result.source.droppableId;

      if (dragColumnName === "pool" && dropColumnName != "pool") {
        const task = result.source.index;
        const draggableColumn = findColumn(columns, dragColumnName);
        const droppableColumn = findColumn(columns, dropColumnName);

        const dragTaskID = draggableColumn[1][task]._id;
        const [reorderedTask] = draggableColumn[1].splice(task, 1);
        droppableColumn[1].splice(result.destination.index, 0, reorderedTask);

        updateVotes(dragTaskID, dropColumnName, token);
        updateWall(columnsUpdated, token);
      }
    }
  };

  return (
    <Grid container className={classes.root}>
      <DragDropContext onDragEnd={handleOnDropEnd}>
        <Paper elevation={3} className={classes.paper}>
          {columnsUpdated.map(([columnName, techs]) => {
            return (
              <Droppable droppableId={columnName} key={columnName}>
                {(provided) => (
                  <ul
                    className={classes.columns + " " + chooseClass(columnName)}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {columnName}
                    {techs &&
                      techs.map(({ _id, name, category }, index) => (
                        <Draggable key={_id} draggableId={_id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <li
                                className={classes.list}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Typography
                                  variant="body1"
                                  style={{
                                    background: getBgPerCategory(category),
                                  }}
                                >
                                  {name}
                                </Typography>
                              </li>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            );
          })}
        </Paper>
      </DragDropContext>
    </Grid>
  );
}

const MapStateToProps = (state) => {
  return {
    token: state.auth.token,
    wall: state.myWall,
  };
};

export default connect(MapStateToProps, {
  updateWall,
  updateVotes,
  buildPersonalWall,
})(Wall);
