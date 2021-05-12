import React, { useState, useEffect } from "react";
/* import Board from "./Board";
 */ import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Wall({ wall }) {
  const { hot, cold, pool, loading } = wall;
  const [columnsUpdated, updateColumns] = useState([]);

  useEffect(() => {
    updateColumns(Object.entries(wall));
  }, [wall]);

  const handleOnDropEnd = (result) => {
    const columns = Array.from(columnsUpdated);
    const dropColumnName = result.destination.droppableId;
    const dragColumnName = result.source.droppableId;

    if (dragColumnName !== dropColumnName) {
      const task = result.source.index;
      const draggableColumn = columns.find((e) => e[0] == dragColumnName);
      const droppableColumn = columns.find((e) => e[0] == dropColumnName);

      const dragTask = draggableColumn[1][task];

      const [reorderedTask] = draggableColumn[1].splice(dragTask, 1);
      droppableColumn[1].splice(result.destination.index, 0, reorderedTask);
      updateColumns(columnsUpdated);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDropEnd}>
        <div style={{ display: "flex", height: "100vh" }}>
          {columnsUpdated.map(([id, tasks]) => {
            return (
              <Droppable droppableId={id} key={id}>
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
                    {id}
                    {tasks &&
                      tasks.map(({ _id, description, name }, index) => (
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

export default Wall;
