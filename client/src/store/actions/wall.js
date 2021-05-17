import { GET_WALL, UPDATE_WALL } from "../actions/types";
import { fetchMyWall } from "./../../api/requests/get";
import { updateWallAPI, updateVoteAPI } from "./../../api/requests/put";

export const buildWall = (token) => async (dispatch) => {
  try {
    const res = await fetchMyWall(token);
    const hot = res.hot.slice(0, 10);
    const cold = res.cold.slice(0, 10);
    const pool = res.pool;

    dispatch({ type: GET_WALL, payload: { hot, cold, pool } });
  } catch (error) {
    console.log(error);
  }
};

export const updateWall = (updatedWallArr, token) => async (dispatch) => {
  const wallObject = {};
  updatedWallArr.forEach((element) => {
    wallObject[element[0]] = element[1];
  });
  try {
    await updateWallAPI(wallObject, token);

    dispatch({ type: UPDATE_WALL, payload: wallObject });
  } catch (err) {
    console.log(err);
  }
};

export const updateVotes = (id, destination, token) => async (dispatch) => {
  const userVote = destination === "hot" ? 1 : -1;
  try {
    const res = await updateVoteAPI(id, userVote, token);
    dispatch({ type: UPDATE_WALL });
  } catch (err) {
    console.log(err);
  }
};
