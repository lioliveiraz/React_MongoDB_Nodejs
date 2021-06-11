import React, { useState } from "react";
import Input from "./../Base/Input";
import Button from "@material-ui/core/Button";
import colors from "../../assets/colors.json";
import { connect } from "react-redux";
import { addCategory } from "./../../store/actions/categories";
import categoryValidator from "../../helpers/validations/categoryValidator";
import Typography from "@material-ui/core/Typography";
import { Select, InputLabel, Grid } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { useStyles } from "./../../assets/css/Categories/categoryForm";

function CreateCategory({ addCategory, token }) {
  const [categoryObject, setCategoryObject] = useState({});
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const getUserInput = (value, name) => {
    setCategoryObject({
      ...categoryObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const inputErrors = categoryValidator(categoryObject);
    if (inputErrors) {
      setErrors(inputErrors);
    } else {
      addCategory(categoryObject, token);
    }
  };
  return (
    <form className={classes.form}>
      <Typography variant="h4" color="secondary">
        Add new Category
      </Typography>
      <Grid item className={classes.input}>
        <Input
          className={classes.input}
          type="text"
          name="name"
          required={true}
          getUserInput={getUserInput}
          placeholder="Name your technology"
          error={errors.name}
        />
      </Grid>

      <Grid item className={classes.input}>
        <InputLabel id="demo-simple-select-filled-label">Color</InputLabel>
        <Select
          id="demo-simple-select-filled"
          name="color"
          variant="filled"
          onChange={(e) => getUserInput(e.target.value, e.target.name)}
          fullWidth
        >
          <MenuItem value="white">Select Color</MenuItem>
          {colors.map(({ hexString, name, colorId }) => (
            <MenuItem
              key={colorId}
              style={{ background: hexString, color: "white" }}
              value={hexString}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body1" className={classes.errorMessage}>
          {" "}
          {errors.color && errors.color}
        </Typography>
      </Grid>

      <Button
        color="secondary"
        variant="contained"
        onClick={submit}
        className={classes.button}
      >
        {" "}
        Add{" "}
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps, { addCategory })(CreateCategory);
