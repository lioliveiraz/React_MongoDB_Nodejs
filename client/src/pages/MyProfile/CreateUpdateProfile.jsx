import React, { useState } from "react";
import Input from "./../../components/Base/Input";
import { upDateProfile } from "./../../store/actions/profile";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import profileValidator from "../../helpers/validations/profileValidator";
import { Grid, TextareaAutosize } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./../../assets/css/Profile/profile";
import Typography from "@material-ui/core/Typography";
import { Select, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function CreateUpdateProfile({ token, upDateProfile }) {
  const history = useHistory();
  const [profileObject, setObject] = useState({
    skills: [],
  });
  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [toggleSocialMedia, setToggleSocialMedia] = useState(false);
  const classes = useStyles();

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
    <Grid container justify="center" align="center" className={classes.root}>
      <Grid item xs={10} className={classes.main}>
        <Paper elevation={2} className={classes.paper}>
          <Grid item>
            <Typography variant="h3" color="primary" className={classes.title}>
              My profile
            </Typography>
          </Grid>
          <Grid item>
            <form className={classes.form}>
              <Grid item className={classes.input}>
                <TextField
                  value={skill}
                  type="text"
                  name="skills"
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyUp={(e) => addSkillToArray(e.code, e.target.value)}
                  placeholder="CSS, HTML, javascript"
                />

                {profileObject.skills
                  ? profileObject.skills.join()
                  : "Separate with comma to add to the list"}
              </Grid>

              <Grid item className={classes.input}>
                <InputLabel id="demo-simple-select-label">
                  Select Role{" "}
                </InputLabel>{" "}
                <Select
                  labelId="demo-simple-select-label"
                  className={classes.select}
                  name="role"
                  onChange={(e) => handleUserInput(e.target.value, "role")}
                >
                  <MenuItem value="">Select Your role</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && errors.role}
                <Grid item className={classes.input}>
                  <TextareaAutosize
                    name="bio"
                    cols="30"
                    rows="10"
                    max="500"
                    onChange={(e) =>
                      handleUserInput(e.target.value, e.target.name)
                    }
                    placeholder="Bio"
                  />
                  {errors.bio && errors.bio}
                </Grid>
              </Grid>

              {toggleSocialMedia ? (
                <Grid item>
                  <Grid item className={classes.input}>
                    <Input
                      name="githubusername"
                      label="Git Hub"
                      required={false}
                      type="text"
                      getUserInput={handleUserInput}
                      placeholder="GitHub username"
                      error={errors.githubusername && errors.githubusername}
                    />
                  </Grid>
                  <Grid item className={classes.input}>
                    <Input
                      name="youtube"
                      required={false}
                      type="text"
                      placeholder="Youtube username"
                      getUserInput={handleUserInput}
                      error={errors.youtube && errors.youtube}
                    />
                  </Grid>
                  <Grid item className={classes.input}>
                    <Input
                      name="twitter"
                      required={false}
                      type="text"
                      placeholder="Twitter username"
                      getUserInput={handleUserInput}
                      error={errors.twitter && errors.twitter}
                    />
                  </Grid>
                  <Grid item className={classes.input}>
                    <Input
                      name="linkedin"
                      required={false}
                      type="text"
                      placeholder="Llinkedin username"
                      getUserInput={handleUserInput}
                      error={errors.linkedin && errors.linkedin}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleSocialMedia(!toggleSocialMedia);
                  }}
                  className={classes.button}
                >
                  Add social media
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                className={classes.button}
              >
                {" "}
                Send
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
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
