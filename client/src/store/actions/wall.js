import { GET_WALL } from "../actions/types";
import { fetchTechs } from "./../../api/requests/get";

export const buildWall = () => async (dispatch) => {
  try {
    const res = await fetchTechs();
    const hot = res.techs.filter((tech) => tech.votes > 0).slice(0, 10);
    const cold = res.techs.filter((tech) => tech.votes < 0).slice(0, 10);
    const pool = res.techs.filter((tech) => tech.votes === 0).slice(0, 10);

    dispatch({ type: GET_WALL, payload: { hot, cold, pool } });
  } catch (error) {
    console.log(error);
  }
};
