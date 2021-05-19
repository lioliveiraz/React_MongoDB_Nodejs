import { GET_WALL, UPDATE_WALL, GET_MY_WALL } from "../actions/types";

const initialState = {
  hot: [],
  cold: [],
  pool: [],
  warm: [],
};

export default function (state = initialState, action) {
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

    default:
      return state;
  }
}
