module.exports = {
  createProfile: (profileData, USER_ID) => {
    const { bio, skills, role, youtube, twitter, linkedin, githubusername } =
      profileData;

    const profileFields = {};
    profileFields.social = {};
    profileFields.user = USER_ID;
    if (bio) profileFields.bio = bio;
    if (skills.length > 0) profileFields.skills = skills;
    if (role) profileFields.role = role;
    if (githubusername)
      profileFields.social.githubusername = `https://www.github.com/${githubusername}`;
    if (youtube)
      profileFields.social.youtube = `https://www.youtube.com/${youtube}`;
    if (twitter)
      profileFields.social.twitter = `https://twitter.com/${twitter}`;
    if (linkedin)
      profileFields.social.linkedin = `https://www.linkedin.com/in/${linkedin}`;

    return profileFields;
  },
};
