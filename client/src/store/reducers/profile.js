import {
  GET_ALL_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  status: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false, status: null };
    case PROFILE_ERROR:
      return { ...state, profile: null, status: payload, loading: true };
    case UPDATE_PROFILE:
      return { ...state, profile: payload, status: null, loading: false };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        status: "Your profile was updated",
        profile: payload,
        loading: true,
      };
    case GET_ALL_PROFILES:
      return { ...state, profiles: payload };
    default:
      return state;
  }
}
