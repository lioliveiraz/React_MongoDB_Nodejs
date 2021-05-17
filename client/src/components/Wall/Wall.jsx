import React from "react";
import Board from "./Board";

function Wall({ wall }) {
  const { hot, cold, pool } = wall;
  return (
    <div style={{ display: "flex" }}>
      <Board techArray={hot} name="hot" />
      <Board techArray={cold} name="cold" />
      <Board techArray={pool} name="pool" />
    </div>
  );
}

export default Wall;
