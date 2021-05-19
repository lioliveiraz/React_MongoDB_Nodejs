import React from "react";
import { getBgPerCategory } from "../../helpers/services";

function Board({ techArray, name }) {
  return (
    <div
      style={{
        marginLeft: "2%",
        background: "pink",
        height: "100%",
        width: "30%",
      }}
    >
      <h2>{name}</h2>
      {techArray.map(({ name, category }, index) => (
        <div
          key={index}
          style={{
            background: getBgPerCategory(category),
            margin: "3px",
            height: "5vh",
            textAlign: "center",
            textJustify: "center",
            fontSize: "1.5rem",
          }}
        >
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}

export default Board;
