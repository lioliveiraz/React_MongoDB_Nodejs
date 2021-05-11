import React, { useEffect } from "react";
import Wall from "../components/Wall/Wall";
import { connect } from "react-redux";
import { buildWall } from "./../store/actions/wall";

function Home({ buildWall, wall }) {
  useEffect(() => {
    async function getWall() {
      buildWall();
    }
    getWall();
  }, []);

  return (
    <div>
      <Wall wall={wall} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wall: state.wall,
  };
};

export default connect(mapStateToProps, { buildWall })(Home);
