import React from "react";
import spinner from "../../assets/images/spinner.gif";

function Spinner(props) {
  return (
    <>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </>
  );
}
export default Spinner;
