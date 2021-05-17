import React, { useEffect } from "react";
import { connect } from "react-redux";
import { buildCommonWall } from "../store/actions/wall";
import Wall from "../components/Wall/Wall";

function Home({ buildCommonWall, wall }) {
  useEffect(() => {
    async function getWall() {
      buildCommonWall();
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

export default connect(mapStateToProps, { buildCommonWall })(Home);
