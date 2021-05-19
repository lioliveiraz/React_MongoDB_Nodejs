import React, { useState, useEffect } from "react";
import Input from "./../components/Base/Input";
import { connect } from "react-redux";
import { handlerLogin } from "../store/actions/auth";
import { toast } from "react-toastify";

function Login({ handlerLogin, errors }) {
  const [userObject, setUserObject] = useState({});

  const getUserInput = (value, name) => {
    setUserObject({
      ...userObject,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    handlerLogin(userObject);
  };

  useEffect(() => {
    toast.error(errors);
  }, [errors]);

  return (
    <>
      <div>Login</div>
      <form>
        <Input
          type="email"
          name="email"
          placeholder="johndow@email.com"
          required={true}
          getUserInput={getUserInput}
        />
        <Input
          type="password"
          name="password"
          required={true}
          getUserInput={getUserInput}
        />
        <button onClick={submit}>LogIn</button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { handlerLogin })(Login);
