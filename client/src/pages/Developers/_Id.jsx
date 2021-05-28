import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getProfilePerId } from "./../../store/actions/profile";
import Spinner from "./../../components/Base/Spinner";
import ProfileCard from "./../../components/Cards/ProfileCard";

function DeveloperProfile({ getProfilePerId, userProfile }) {
  const { id } = useParams();

  useEffect(() => {
    async function getDeveloper() {
      await getProfilePerId(id);
    }
    getDeveloper();
  }, []);

  if (!userProfile) {
    return (
      <div>
        <Spinner />
      </div>
    );
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
