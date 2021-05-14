import { GET_WALL, TO_HOT } from "../actions/types";
import { TO_COLD } from "./../actions/types";

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
    case TO_COLD:
      return state;
    case TO_HOT:
      return state;
    default:
      return state;
  }
}
