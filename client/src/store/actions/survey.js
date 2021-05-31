import { fetchTechs } from "./../../api/requests/get";
import { GET_SURVEY } from "./types";

export const buildSurvey = () => async (dispatch) => {
  try {
    let res = await fetchTechs();

    dispatch({
      type: GET_SURVEY,
      payload: res.techs,
    });
  } catch (err) {
    console.log(err);
  }
};
