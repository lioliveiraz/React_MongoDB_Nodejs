import React, { useState } from "react";
import Input from "./../../components/Base/Input";
import { upDateProfile } from "./../../store/actions/profile";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function CreateUpdateProfile({ token, upDateProfile, setIsForm }) {
  const [profileObject, setObject] = useState({
    skills: ["Separate with comma to add to the list"],
  });
  const [skill, setSkill] = useState("");

  const addSkillToArray = async (code, value) => {
    if (code === "Comma") {
      let newValue = value.trim().substring(0, value.length - 1);

      await setObject({
        skills: [...profileObject.skills, newValue],
      });

      setSkill("");
    }
  };

  const handleUserInput = (value, name) => {
    setObject({
      ...profileObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await upDateProfile(profileObject, token);
      setIsForm(false);
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  };

  return (
    <form>
      <label htmlFor="bio"> Bio</label>
      <textarea
        name="bio"
        cols="30"
        rows="10"
        onChange={(e) => handleUserInput(e.target.value, e.target.name)}
      />
      <label htmlFor="skills">Skills</label>
      <input
        value={skill}
        type="text"
        onChange={(e) => setSkill(e.target.value)}
        onKeyUp={(e) => addSkillToArray(e.code, e.target.value)}
        onFocus={() => setObject({ skills: [] })}
        placeholder="css,html,javascript"
      />
      {profileObject.skills}
      <Input
        name="role"
        required={true}
        type="text"
        getUserInput={handleUserInput}
        placeholder="Developer"
      />
      <Input
        name="githubusername"
        label="Git Hub"
        required={true}
        type="text"
        getUserInput={handleUserInput}
        placeholder="myUserName"
      />
      <Input
        name="youtube"
        required={true}
        type="text"
        placeholder="myUsername"
        getUserInput={handleUserInput}
      />
      <Input
        name="twitter"
        required={true}
        type="text"
        placeholder="myUsername"
        getUserInput={handleUserInput}
      />
      <Input
        name="linkedin"
        required={true}
        type="text"
        placeholder="myUsername"
        getUserInput={handleUserInput}
      />
      <button onClick={submit}> Send</button>
      <button onClick={() => setIsForm(false)}> close</button>
    </form>
  );
}

export default connect(null, { upDateProfile })(CreateUpdateProfile);
