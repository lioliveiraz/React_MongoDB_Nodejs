import { LOGIN_SUCCEED, LOGIN_FAIL, LOGOUT } from "./types";
import { login } from "../../api/requests/post";

export const handlerLogin = (userObject) => async (dispatch) => {
  try {
    const response = await login(userObject);
    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCEED, payload: token });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.errors.msg });
  }
};

export const handlerLogOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
