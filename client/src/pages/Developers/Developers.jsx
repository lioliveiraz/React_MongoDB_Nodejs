import React, { useState } from "react";
import { useEffect } from "react";
import Cards from "./../../components/Developers/Cards";
import { connect } from "react-redux";
import { getAllProfiles } from "../../store/actions/profile";

function Developers({ user_id, profiles, getAllProfiles }) {
  const [developers, setDevelopers] = useState();

  useEffect(() => {
    async function getDevs() {
      getAllProfiles();
    }
    getDevs();
  }, []);

  useEffect(() => {
    const developers = profiles.filter((user) => user._id != user_id);
    setDevelopers(developers);
  }, [profiles]);

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
    profiles: state.profile.profiles,
  };
};

export default connect(MapStateToProps, { getAllProfiles })(Developers);
