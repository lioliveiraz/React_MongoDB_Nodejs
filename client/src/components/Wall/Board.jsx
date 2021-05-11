import React from "react";

function Board({ techArray, name }) {
  return (
    <div
      style={{
        marginLeft: "2px",
        background: "pink",
        height: "100%",
        width: "30%",
      }}
    >
      <h2>{name}</h2>
      {techArray.map(({ name }, index) => (
        <div key={index} style={{ background: "teal", margin: "3px" }}>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}

export default Board;
