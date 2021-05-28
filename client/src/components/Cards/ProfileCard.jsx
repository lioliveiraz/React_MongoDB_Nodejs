import React, { useState, useEffect } from "react";

function ProfileCard({ profile: { loading, profile, status } }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [socialMedia, setSocialMedia] = useState(null);

  useEffect(() => {
    async function getDeveloper() {
      setUserProfile(profile);

      if (!loading) {
        setUserInfo(profile.user);
        setSocialMedia(profile.social ? profile.social : null);
      }
    }
    getDeveloper();
  }, [profile]);

  if (!profile) {
    return <p>{status}</p>;
  }

  return (
    <>
      {userProfile && (
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
          {socialMedia ? (
            <div style={{ background: "turquoise", color: "white" }}>
              <a href={socialMedia.youtube}> Youtube</a>
              <a href={socialMedia.linkedin}> Linkedin</a>
              <a href={socialMedia.githubusername}> Github</a>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default ProfileCard;
