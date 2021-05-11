import React, { useState } from "react";
import Input from "../components/Base/Input";
import validateUser from "../helpers/validations/userValidator";
import { toast } from "react-toastify";
import { registerNewUser } from "./../api/requests/post";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [userObject, setUserObject] = useState();
  const [inputErrors, setInputErrors] = useState({});
  const history = useHistory();
  const getUserInput = (value, name) => {
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const errors = validateUser(userObject);
    if (errors) {
      for (const error in errors) {
        setInputErrors({
          ...inputErrors,
          [error]: errors[error],
        });
      }
    } else {
      try {
        const response = await registerNewUser(userObject);
        toast.success(response.data.msg);
        history.push("/login");
      } catch (error) {
        const apiErrors = error.response.data.errors;
        apiErrors.forEach((error) => {
          if (error.msg.includes("already registered")) {
            history.push("/login");
          }
          toast.error(error.msg);
        });
      }
    }
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <Input
          type="text"
          name="name"
          placeholder="John Doe"
          required={true}
          getUserInput={getUserInput}
        />
        {inputErrors["name"] && inputErrors.name}
        <Input
          type="email"
          name="email"
          placeholder="johndoe@email.com"
          required={true}
          getUserInput={getUserInput}
        />
        {inputErrors["email"] && inputErrors.email}

        <Input
          type="password"
          name="password"
          required={true}
          getUserInput={getUserInput}
        />
        {inputErrors["password"] && inputErrors.password}

        <button onClick={submit}> Submit </button>
      </form>
    </>
  );
}

export default SignUp;
