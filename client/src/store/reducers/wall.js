import { GET_WALL } from "../actions/types";

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
    default:
      return state;
  }
}
