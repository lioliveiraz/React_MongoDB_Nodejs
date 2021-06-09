import { UPDATE_WALL, GET_MY_WALL, PUSH_NOTIFICATION } from "../actions/types";

const initialState = {
  techs: {
    hot: [],
    cold: [],
    pool: [],
  },
  notification: 0,
};

export default function myWall(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_MY_WALL:
      return {
        ...state,
        techs: { hot: payload.hot, cold: payload.cold, pool: payload.pool },
        notification: 0,
      };
    case UPDATE_WALL:
      return state;

    default:
      return state;
  }
}
