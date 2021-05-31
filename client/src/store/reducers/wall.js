import {
  GET_WALL,
  UPDATE_WALL,
  CREATE_NEW_TECH,
  CREATE_NEW_TECH_FAIL,
} from "../actions/types";

const initialState = {
  hot: [],
  cold: [],
  pool: [],
  warm: [],
  status: "",
  errors: [],
};

export default function wall(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_WALL:
      return {
        ...state,
        hot: payload.hot,
        cold: payload.cold,
        pool: payload.pool,
        warm: payload.warm,
      };

    case UPDATE_WALL:
      return state;
    case CREATE_NEW_TECH:
      return {
        ...state,
        status: payload,
        errors: [],
      };
    case CREATE_NEW_TECH_FAIL:
      return {
        ...state,
        status: "",
        errors: payload,
      };
    default:
      return state;
  }
}
