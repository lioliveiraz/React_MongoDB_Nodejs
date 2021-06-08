import React, { useState } from "react";
import Input from "../components/Base/Input";
import validateUser from "../helpers/validations/userValidator";
import { toast } from "react-toastify";
import { registerNewUser } from "./../api/requests/post";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function SignUp() {
  const [userObject, setUserObject] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const history = useHistory();
  const getUserInput = (value, name) => {
    setInputErrors({});
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUser(userObject);
    if (validationErrors) {
      setInputErrors(validationErrors);
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
      <form data-cy="signUp-form">
        <Input
          type="text"
          name="name"
          placeholder="John Doe"
          required={true}
          getUserInput={getUserInput}
          error={inputErrors["name"] && inputErrors.name}
        />

        <Input
          type="email"
          name="email"
          placeholder="johndoe@email.com"
          required={true}
          getUserInput={getUserInput}
          error={inputErrors["email"] && inputErrors.email}
        />

        <Input
          type="password"
          name="password"
          required={true}
          getUserInput={getUserInput}
          error={inputErrors["password"] && inputErrors.password}
        />

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={submit}
          disabled={Object.keys(userObject).length !== 3}
          data-cy="sign-up-submit-button"
        >
          {" "}
          Submit{" "}
        </Button>
      </form>
    </>
  );
}

export default SignUp;
