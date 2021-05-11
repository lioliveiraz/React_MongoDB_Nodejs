import React, { useState } from "react";
import Board from "./Board";

function Wall({ wall }) {
  const { hot, cold, pool } = wall;
  return (
    <div>
      <h1>Wall</h1>
      <div style={{ display: "flex", background: "purple", height: "30vh" }}>
        <Board techArray={cold} name="Cold" />
        <Board techArray={hot} name="Hot" />
        <Board techArray={pool} name="Pool" />
      </div>
    </div>
  );
}

export default Wall;
