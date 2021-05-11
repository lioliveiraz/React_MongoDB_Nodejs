import { combineReducers } from "redux";
import auth from "./auth";
import wall from "./wall";
import profile from "./profile";

export default combineReducers({ auth, wall, profile });
