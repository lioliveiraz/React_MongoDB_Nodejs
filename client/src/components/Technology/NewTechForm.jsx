import React, { useState, useEffect } from "react";
import Input from "./../Base/Input";
import Button from "@material-ui/core/Button";
import { addNewTech } from "../../store/actions/wall";
import { connect } from "react-redux";
import { getCategories } from "./../../store/actions/categories";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import techValidator from "../../helpers/validations/techValidator";
import { InputLabel, Select, TextareaAutosize } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

function NewTechForm({ addNewTech, token, getCategories, categories, wall }) {
  const [techObject, setTechObject] = useState({});
  const [category, setCategory] = useState("Select Category");
  const [errors, setErrors] = useState({});
  const history = useHistory();

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
      await addNewTech(history, techObject, token);
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
    <form>
      <Input
        type="text"
        name="name"
        required
        placeholder="Tech name"
        getUserInput={getUserInput}
        error={errors.name && errors.name}
      />
      <TextareaAutosize
        name="description"
        cols="30"
        rows="10"
        placeholder="Description"
        onChange={(e) => getUserInput(e.target.value, e.target.name)}
      />
      {errors.description && errors.description}
      <InputLabel id="demo-simple-select-label">{category}</InputLabel>

      <Select
        labelId="demo-simple-select-label"
        name="category"
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
      <Input
        type="text"
        name="creator"
        required
        placeholder="Creator"
        getUserInput={getUserInput}
      />
      {errors.creator && errors.creator}

      <Button onClick={submit}> Submit</Button>
    </form>
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
