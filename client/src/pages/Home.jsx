import React, { useEffect } from "react";
import { connect } from "react-redux";

function Home() {
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    wall: state.wall,
    token: state.auth.token,
  };
};

export default connect(null, {})(Home);
