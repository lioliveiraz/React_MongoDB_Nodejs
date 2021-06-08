import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getProfilePerId } from "./../../store/actions/profile";
import ProfileCard from "./../../components/Cards/ProfileCard";

function DeveloperProfile({ getProfilePerId, userProfile }) {
  const { id } = useParams();

  useEffect(() => {
    async function getDeveloper() {
      await getProfilePerId(id);
    }
    getDeveloper();
  }, [getProfilePerId, id]);

  if (!userProfile) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <ProfileCard profile={userProfile} />
    </div>
  );
}
const MapStateToProps = (state) => {
  return {
    userProfile: state.profile,
  };
};
export default connect(MapStateToProps, { getProfilePerId })(DeveloperProfile);
