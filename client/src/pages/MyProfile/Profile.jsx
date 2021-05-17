import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProfileCard from "../../components/Base/ProfileCard";
import { getCurrentProfile } from "./../../store/actions/profile";
import CreateUpdateProfile from "./CreateUpdateProfile";

function Profile({ token, getCurrentProfile, profile }) {
  const [isForm, setIsForm] = useState(false);

  useEffect(async () => {
    getCurrentProfile(token);
  }, []);

  return (
    <div>
      <ProfileCard profile={profile} />

      <button onClick={() => setIsForm(!isForm)}>
        {" "}
        {!profile.loading ? "Update Profile" : "Create Profile"}
      </button>
      {isForm ? (
        <CreateUpdateProfile token={token} setIsForm={setIsForm} />
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
