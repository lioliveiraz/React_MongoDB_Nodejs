import React, { useState } from "react";
import Input from "./../../components/Base/Input";
import { upDateProfile } from "./../../store/actions/profile";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import profile from "../../store/reducers/profile";

function CreateUpdateProfile({ token, upDateProfile }) {
  const history = useHistory();
  const [profileObject, setObject] = useState({
    skills: [],
  });
  const [skill, setSkill] = useState("");

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

  /*   const addSocialMedia = async (value, name) => {
    await handleUserInput(
      {
        ...profileObject.social,
        [name]: value,
      },
      "social"
    );
  }; */

  const submit = async (e) => {
    e.preventDefault();
    try {
      await upDateProfile(profileObject, token, history);
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  };

  return (
    <form>
      <textarea
        name="bio"
        cols="30"
        rows="10"
        onChange={(e) => handleUserInput(e.target.value, e.target.name)}
        placeholder="Bio"
      />
      <input
        value={skill}
        type="text"
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
          />
          <Input
            name="youtube"
            required={false}
            type="text"
            placeholder="Youtube username"
            getUserInput={handleUserInput}
          />
          <Input
            name="twitter"
            required={false}
            type="text"
            placeholder="Twitter username"
            getUserInput={handleUserInput}
          />
          <Input
            name="linkedin"
            required={false}
            type="text"
            placeholder="Llinkedin username"
            getUserInput={handleUserInput}
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
