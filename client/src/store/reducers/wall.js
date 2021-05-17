import { GET_WALL, TO_HOT } from "../actions/types";
import { UPDATE_WALL } from "./../actions/types";

const initialState = {
  hot: [],
  cold: [],
  pool: [],
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
      };
    case UPDATE_WALL:
      return state;

    default:
      return state;
  }
}
