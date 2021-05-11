import { fetchMyProfile } from "../../api/requests/get";
import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

export const getCurrentProfile = (token) => async (dispatch) => {
  try {
    const res = await fetchMyProfile(token);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: err.response.data.errors.msg });
  }
};
