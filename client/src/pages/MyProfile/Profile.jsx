import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../store/actions/profile";

function Profile({
  token,
  getCurrentProfile,
  profile: { loading, profile, errors },
  user: { user },
}) {
  useEffect(async () => {
    getCurrentProfile(token);
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>My profile</h1>
      <h2>{user.name}</h2>
      <img
        src={
          profile.user
            ? profile.user.avatar
            : "../../assets/images/profilePic.jpeg"
        }
        alt={user.name}
      />
      <p>{profile.bio && profile.bio}</p>
      <p>{profile.role && profile.role}</p>
      <p>{profile.githubusername && profile.githubusername}</p>
      <button>Update Form</button>
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.profile,
  user: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
