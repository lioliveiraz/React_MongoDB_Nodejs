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
  errors: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false, errors: null };
    case PROFILE_ERROR:
      return { ...state, profile: null, errors: payload, loading: true };
    case UPDATE_PROFILE:
      return { ...state, profile: payload, errors: null, loading: false };
    case UPDATE_PROFILE_FAIL:
      return { ...state, errors: payload, loading: true };
    case GET_ALL_PROFILES:
      return { ...state, profiles: payload };
    default:
      return state;
  }
}
