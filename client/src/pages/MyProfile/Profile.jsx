import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProfileCard from "../../components/Cards/ProfileCard";
import { getCurrentProfile } from "./../../store/actions/profile";

function Profile({ token, getCurrentProfile, profile }) {
  const [isForm, setIsForm] = useState(false);

  useEffect(async () => {
    getCurrentProfile(token);
  }, []);

  return (
    <div>
      <ProfileCard profile={profile} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
