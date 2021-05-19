import React from "react";
import Board from "./Board";

function Wall({ wall }) {
  const { hot, cold, pool, warm } = wall;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Board techArray={cold} name="cold" />
        <Board techArray={warm} name="warm" />
        <Board techArray={hot} name="hot" />
      </div>
      <div style={{ background: "purple", marginTop: "2%" }}>
        <Board techArray={pool} name="pool" />
      </div>
    </div>
  );
}

export default Wall;
