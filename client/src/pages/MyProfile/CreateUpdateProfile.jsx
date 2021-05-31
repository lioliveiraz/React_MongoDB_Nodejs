import React, { useState } from "react";
import Input from "./../../components/Base/Input";
import { upDateProfile } from "./../../store/actions/profile";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import profileValidator from "../../helpers/validations/profileValidator";

function CreateUpdateProfile({ token, upDateProfile }) {
  const history = useHistory();
  const [profileObject, setObject] = useState({
    skills: [],
  });
  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState({});

  const [toggleSocialMedia, setToggleSocialMedia] = useState(false);

  const handleUserInput = (value, name) => {
    setObject({
      ...profileObject,
      [name]: value,
    });
  };

  const addSkillToArray = async (code, value) => {
    if (code === "Comma") {
      let newValue = value.trim().substring(0, value.length - 1);

      await handleUserInput([...profileObject.skills, newValue], "skills");

      setSkill("");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const inputErrors = profileValidator(profileObject);
    if (inputErrors) {
      setErrors(inputErrors);
    } else {
      upDateProfile(profileObject, token, history);
    }
  };

  return (
    <form>
      <textarea
        name="bio"
        cols="30"
        rows="10"
        max="500"
        onChange={(e) => handleUserInput(e.target.value, e.target.name)}
        placeholder="Bio"
      />
      {errors.bio && errors.bio}
      <input
        value={skill}
        type="text"
        name="skills"
        onChange={(e) => setSkill(e.target.value)}
        onKeyUp={(e) => addSkillToArray(e.code, e.target.value)}
        placeholder="css,html,javascript"
      />

      {profileObject.skills
        ? profileObject.skills.join()
        : "Separate with comma to add to the list"}
      <select
        name="role"
        onChange={(e) => handleUserInput(e.target.value, "role")}
      >
        <option value="">Select Your role</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {errors.role && errors.role}
      <button
        onClick={(e) => {
          e.preventDefault();
          setToggleSocialMedia(!toggleSocialMedia);
        }}
      >
        Add social media
      </button>

      {toggleSocialMedia ? (
        <>
          <Input
            name="githubusername"
            label="Git Hub"
            required={false}
            type="text"
            getUserInput={handleUserInput}
            placeholder="GitHub username"
            error={errors.githubusername && errors.githubusername}
          />
          <Input
            name="youtube"
            required={false}
            type="text"
            placeholder="Youtube username"
            getUserInput={handleUserInput}
            error={errors.youtube && errors.youtube}
          />
          <Input
            name="twitter"
            required={false}
            type="text"
            placeholder="Twitter username"
            getUserInput={handleUserInput}
            error={errors.twitter && errors.twitter}
          />
          <Input
            name="linkedin"
            required={false}
            type="text"
            placeholder="Llinkedin username"
            getUserInput={handleUserInput}
            error={errors.linkedin && errors.linkedin}
          />
        </>
      ) : null}

      <button onClick={submit}> Send</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { upDateProfile })(CreateUpdateProfile);

const roles = [
  "Junior FrontEnd Developer",
  "Senior FrontEnd Developer",
  "Middle FrontEnd Developer",
  "Junior Backend Developer",
  "Senior Backend Developer",
  "Middle Backend Developer",
  "Junior Designer",
  "Senior Designer",
  "Middle Designer",
  "Junior Project Manager",
  "Senior Project Manager",
  "Middle Project Manager",
];
