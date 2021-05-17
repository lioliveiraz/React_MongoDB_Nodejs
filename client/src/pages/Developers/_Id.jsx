import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileCard from "./../../components/Base/ProfileCard";
import { connect } from "react-redux";
import { getProfilePerId } from "./../../store/actions/profile";

function DeveloperProfile({ getProfilePerId, userProfile }) {
  const { id } = useParams();

  useEffect(() => {
    async function getDeveloper() {
      await getProfilePerId(id);
    }
    getDeveloper();
  }, []);

  if (!userProfile) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <ProfileCard profile={userProfile} />
    </div>
  );
}
export const MapStateToProps = (state) => {
  return {
    userProfile: state.profile,
  };
};
export default connect(MapStateToProps, { getProfilePerId })(DeveloperProfile);
