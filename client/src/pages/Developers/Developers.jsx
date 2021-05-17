import React, { useState } from "react";
import { useEffect } from "react";
import { fetchDevelopers } from "../../api/requests/get";
import Cards from "./../../components/Developers/Cards";
import { connect } from "react-redux";

function Developers({ user_id }) {
  const [developers, setDevelopers] = useState();

  useEffect(() => {
    async function getDevs() {
      const res = await fetchDevelopers();
      const developers = res.filter((user) => user._id != user_id);
      setDevelopers(developers);
    }
    getDevs();
  }, []);

  return (
    <>
      <div>
        {developers &&
          developers.map((developer) => (
            <div key={developer._id}>
              <Cards developer={developer} />
            </div>
          ))}
      </div>
    </>
  );
}
export const MapStateToProps = (state) => {
  return {
    user_id: state.auth.user,
  };
};

export default connect(MapStateToProps, {})(Developers);
