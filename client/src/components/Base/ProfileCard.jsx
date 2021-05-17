import React, { useState, useEffect } from "react";

function ProfileCard({ profile: { loading, profile, errors } }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [socialMedia, setSocialMedia] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    async function getDeveloper() {
      setError(errors);
      setUserProfile(profile);

      if (!loading) {
        setUserInfo(profile.user);
        setSocialMedia(profile.social);
      }
    }
    getDeveloper();
  }, [profile]);

  return (
    <>
      {userProfile ? (
        <div>
          <img src={userInfo.avatar} alt={userInfo.name} />
          <h2>{userInfo.name}</h2>
          <p>{userProfile.bio}</p>
          <p>{userProfile.role}</p>
          {userProfile.skills.map((skill) => {
            <p>{skill}</p>;
          })}

          <a href={socialMedia.youtube}> Youtube</a>
          <a href={socialMedia.linkedin}> Linkedin</a>
          <a href={socialMedia.github}> Github</a>
        </div>
      ) : (
        <div>{error ? error : "loading"}</div>
      )}
    </>
  );
}

export default ProfileCard;
