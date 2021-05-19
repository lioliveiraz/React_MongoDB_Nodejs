import { GET_WALL } from "../actions/types";
import { fetchTechs } from "./../../api/requests/get";

export const buildCommonWall = () => async (dispatch) => {
  try {
    let res = await fetchTechs();
    res = res.techs;
    const hot = res.filter((tech) => tech.like > tech.unlike).slice(0, 10);
    const cold = res.filter((tech) => tech.like < tech.unlike).slice(0, 10);
    const warm = res
      .filter(({ like, unlike }) => like === unlike && (like > 0 || unlike > 0))
      .slice(0, 10);
    const pool = res.filter((tech) => tech.like === 0 && tech.unlike === 0);

    dispatch({ type: GET_WALL, payload: { hot, cold, pool, warm } });
  } catch (err) {
    console.log(err);
  }
};
