import { combineReducers } from "redux";
import auth from "./auth";
import wall from "./wall";
import profile from "./profile";
import myWall from "./myWall";
import survey from "./survey";

export default combineReducers({ auth, wall, profile, myWall, survey });
