import { UPDATE_WALL, GET_MY_WALL } from "../actions/types";

const initialState = {
  techs: {
    hot: [],
    cold: [],
    pool: [],
  },
  notification: 0,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_MY_WALL:
      return {
        ...state,
        techs: { hot: payload.hot, cold: payload.cold, pool: payload.pool },
        notification: payload.notification,
      };
    case UPDATE_WALL:
      return state;

    default:
      return state;
  }
}
