import { fetchMyProfile, fetchDeveloperProfile } from "../../api/requests/get";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
} from "../actions/types";
import { registerProfile } from "./../../api/requests/post";
import { UPDATE_PROFILE_FAIL } from "./types";
import { fetchDevelopers } from "./../../api/requests/get";

export const getCurrentProfile = (token) => async (dispatch) => {
  try {
    const res = await fetchMyProfile(token);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: err.response.data.errors.msg });
  }
};

export const getProfilePerId = (id) => async (dispatch) => {
  try {
    const res = await fetchDeveloperProfile(id);
    dispatch({ type: GET_PROFILE, payload: res });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: err.response.data.errors.msg });
  }
};

export const upDateProfile =
  (profileObject, token, history) => async (dispatch) => {
    try {
      const res = await registerProfile(profileObject, token);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      history.push("/my-profile");
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: { error: "Something went wrong" },
      });
    }
  };

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await fetchDevelopers();
    dispatch({ type: GET_ALL_PROFILES, payload: res });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: { error: "Something went wrong" },
    });
  }
};
