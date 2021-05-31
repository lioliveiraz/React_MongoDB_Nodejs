import { GET_SURVEY } from "../../store/actions/types";

const initialState = {
  techs: [],
};

export default function survey(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_SURVEY:
      return {
        ...state,
        techs: payload,
      };

    default:
      return state;
  }
}
