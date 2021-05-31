import React, { useState } from "react";
import Input from "./../Base/Input";
import Button from "@material-ui/core/Button";
import colors from "../../assets/colors.json";
import { connect } from "react-redux";
import { addCategory } from "./../../store/actions/categories";
import categoryValidator from "../../helpers/validations/categoryValidator";

function CreateCategory({ addCategory, token }) {
  const [categoryObject, setCategoryObject] = useState({});
  const [errors, setErrors] = useState({});

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
    <form>
      <h4>Add new Category</h4>
      <Input
        type="text"
        name="name"
        required={true}
        getUserInput={getUserInput}
        placeholder="Name your technology"
        error={errors.name}
      />
      <select
        name="color"
        id=""
        onChange={(e) => getUserInput(e.target.value, e.target.name)}
      >
        <option value="white">Select Color</option>
        {colors.map(({ hexString, name, colorId }) => (
          <option
            key={colorId}
            style={{ background: hexString, color: "white" }}
            value={hexString}
          >
            {name}
          </option>
        ))}
      </select>
      {errors.color && errors.color}

      <Button color="primary" onClick={submit}>
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
