import React, { useState, useEffect } from "react";
import Input from "./../Base/Input";
import Button from "@material-ui/core/Button";
import { addNewTech } from "../../store/actions/wall";
import { connect } from "react-redux";
import { getCategories } from "./../../store/actions/categories";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import techValidator from "../../helpers/validations/techValidator";
import { InputLabel, Paper, Select, TextareaAutosize } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";
import { useStyles } from "./../../assets/css/Technologies/newTechForm";
import Typography from "@material-ui/core/Typography";

function NewTechForm({ addNewTech, token, getCategories, categories, wall }) {
  const [techObject, setTechObject] = useState({});
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const getUserInput = (value, name) => {
    setTechObject({
      ...techObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const inputErrors = techValidator(techObject);
    if (inputErrors) {
      setErrors(inputErrors);
      toast.error("Something is not right!");
    } else {
      addNewTech(history, techObject, token);
    }
  };

  useEffect(() => {
    if (wall.errors.length > 0) {
      return wall.errors.forEach(({ msg }) => toast.error(msg));
    }
    if (wall.status) {
      return toast.success(wall.status);
    }
  }, [wall.errors, wall.status]);

  return (
    <Grid item xs={10} className={classes.form}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h3" color="primary" className={classes.title}>
          {" "}
          New Tech
        </Typography>

        <Grid item>
          <form>
            <Grid item className={classes.input}>
              <Input
                type="text"
                name="name"
                required
                placeholder="Tech name"
                getUserInput={getUserInput}
                error={errors.name && errors.name}
              />
            </Grid>
            <Grid item className={classes.input}>
              <TextareaAutosize
                name="description"
                cols="30"
                rows="10"
                placeholder="Description"
                onChange={(e) => getUserInput(e.target.value, e.target.name)}
              />
              {errors.description && errors.description}
              <InputLabel id="demo-simple-select-label">{category}</InputLabel>
            </Grid>
            <Grid item className={classes.input}>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                name="category"
                className={classes.select}
                value={category}
                onChange={(e) => {
                  getUserInput(e.target.value, e.target.name);
                  setCategory(e.target.name);
                }}
              >
                {categories &&
                  categories.map(({ _id, name, color }) => (
                    <MenuItem
                      key={name}
                      style={{ background: color, color: "white" }}
                      value={_id}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item className={classes.input}>
              <Input
                type="text"
                name="creator"
                required
                placeholder="Creator"
                getUserInput={getUserInput}
                error={errors.creator && errors.creator}
              />
            </Grid>

            <Button
              onClick={submit}
              variant="contained"
              color="secondary"
              disabled={techObject.name && techObject.category ? false : true}
            >
              {" "}
              Submit
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    token: state.auth.token,
    wall: state.wall,
  };
};

export default connect(mapStateToProps, { addNewTech, getCategories })(
  NewTechForm
);
