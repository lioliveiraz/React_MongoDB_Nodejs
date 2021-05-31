import { fetchCategories } from "../../api/requests/get";
import { updateCategory } from "../../api/requests/put";
import { registerNewCategory } from "../../api/requests/post";

import {
  POST_CATEGORIES,
  POST_CATEGORIES_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORIES_FAIL,
} from "./types";

export const getCategories = () => async (dispatch) => {
  try {
    const categories = await fetchCategories();
    dispatch({
      type: GET_CATEGORIES,
      payload: categories,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: { error: "Something went wrong" },
    });
  }
};

export const updateCategories = (id, color, token) => async (dispatch) => {
  try {
    const response = await updateCategory(id, color, token);
    const updatedCategory = response.data;

    dispatch({ type: UPDATE_CATEGORIES, payload: updatedCategory });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_CATEGORIES_FAIL,
      payload: { error: "Something went wrong" },
    });
  }
};

export const addCategory = (categoryObj, token) => async (dispatch) => {
  try {
    const res = await registerNewCategory(categoryObj, token);
    dispatch({ type: POST_CATEGORIES, payload: res.data });
    console.log(res);
  } catch (error) {
    const message = error.response.data.error.msg;
    dispatch({ type: POST_CATEGORIES_FAIL, payload: message });
  }
};
