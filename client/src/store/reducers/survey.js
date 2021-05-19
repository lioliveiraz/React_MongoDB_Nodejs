import { GET_CATEGORIES, GET_SURVEY } from "../../store/actions/types";

const initialState = {
  techs: [],
  categories: [],
  frameworks: [],
  libraries: [],
  testing: [],
  databases: [],
  collaboration: [],
  languages: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_SURVEY:
      return {
        ...state,
        techs: payload.techs,
        categories: payload.categories,
        frameworks: payload.frameworks,
        libraries: payload.libraries,
        testing: payload.testing,
        databases: payload.databases,
        collaboration: payload.collaboration,
        languages: payload.languages,
      };
    default:
      return state;
  }
}
