import React, { useState } from "react";
import Input from "./../components/Base/Input";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { handlerLogin } from "../store/actions/auth";

function Login({ handlerLogin, isAuthenticated }) {
  const history = useHistory();
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
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { handlerLogin })(Login);
