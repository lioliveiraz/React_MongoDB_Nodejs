import { LOGIN_FAIL, LOGIN_SUCCEED, LOGOUT } from "../actions/types";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

function getUserId(token) {
  if (token) {
    return jwt_decode(token).user.id;
  }
  return null;
}

function isAdm(token) {
  if (token) {
    return jwt_decode(token).user.adm;
  }
  return null;
}

const initialState = {
  token: token,
  isAuthenticated: !!token,
  loading: true,
  user: getUserId(token),
  errors: null,
  adm: isAdm(token),
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOGIN_SUCCEED:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
