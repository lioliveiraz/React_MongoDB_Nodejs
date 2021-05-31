import { LOGIN_FAIL, LOGIN_SUCCEED, LOGOUT } from "../actions/types";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

function getUserId(userToken) {
  if (userToken) return jwt_decode(userToken).user.id;
  return false;
}

function isAdm(userToken) {
  if (userToken) {
    return jwt_decode(userToken).user.adm;
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

export default function auth(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOGIN_SUCCEED:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
        errors: null,
        user: getUserId(payload),
        adm: isAdm(payload),
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
        adm: false,
      };
    default:
      return state;
  }
}
