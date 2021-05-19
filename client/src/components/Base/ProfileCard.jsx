import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

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
          <h2>Name:{userInfo.name}</h2>
          <p>Bio:{userProfile.bio}</p>
          <p>role:{userProfile.role}</p>
          <ol>
            Skills:{" "}
            {userProfile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ol>
          <h3>Social</h3>
          <div style={{ background: "turquoise", color: "white" }}>
            <a href={socialMedia.youtube}> Youtube</a>
            <a href={socialMedia.linkedin}> Linkedin</a>
            <a href={socialMedia.github}> Github</a>
          </div>
        </div>
      ) : (
        <div>{error ? error : <Spinner />}</div>
      )}
    </>
  );
}

export default ProfileCard;
