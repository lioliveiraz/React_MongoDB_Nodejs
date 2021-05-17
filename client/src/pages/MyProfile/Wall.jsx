import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  updateWall,
  updateVotes,
  buildPersonalWall,
} from "./../../store/actions/wall";
import { findColumn } from "../../helpers/services";

function Wall({ buildPersonalWall, wall, token, updateWall, updateVotes }) {
  const [columnsUpdated, updateColumns] = useState([]);

  useEffect(() => {
    async function getWall() {
      buildPersonalWall(token);
    }
    getWall();
  }, []);

  useEffect(() => {
    updateColumns(Object.entries(wall));
  }, [wall]);

  const handleOnDropEnd = (result) => {
    if (result.destination) {
      const columns = Array.from(columnsUpdated);
      const dropColumnName = result.destination.droppableId;
      const dragColumnName = result.source.droppableId;

      if (dragColumnName !== dropColumnName && dropColumnName != "pool") {
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
    <div>
      <DragDropContext onDragEnd={handleOnDropEnd}>
        <div style={{ display: "flex", height: "100vh" }}>
          {columnsUpdated.map(([columnName, techs]) => {
            return (
              <Droppable droppableId={columnName} key={columnName}>
                {(provided) => (
                  <ul
                    style={{
                      background: "purple",
                      margin: "2px",
                      width: "50%",
                    }}
                    className="list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {columnName}
                    {techs &&
                      techs.map(({ _id, name }, index) => (
                        <Draggable key={_id} draggableId={_id} index={index}>
                          {(provided) => {
                            return (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <p
                                  style={{
                                    padding: "5px",
                                    background: "red",
                                    margin: "3px",
                                  }}
                                >
                                  {name}
                                </p>
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
        </div>
      </DragDropContext>
    </div>
  );
}

const MapStateToProps = (state) => {
  return {
    token: state.auth.token,
    wall: state.wall,
  };
};

export default connect(MapStateToProps, {
  updateWall,
  updateVotes,
  buildPersonalWall,
})(Wall);
