import {
  POST_CATEGORIES,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORIES_FAIL,
  POST_CATEGORIES_FAIL,
} from "../actions/types";

const updateCategoriesArray = (categories, updatedCat) => {
  const indexOfCategory = categories.findIndex(
    (el) => el._id === updatedCat._id
  );

  categories.splice(indexOfCategory, 1, updatedCat);

  return categories;
};

const addNewCategory = (categories, newCat) => {
  categories.push(newCat);

  return categories;
};

const initialState = {
  categories: [],
  category: {},
  loading: true,
  status: "",
  errors: "",
};

export default function categories(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,

        categories: [],
        loading: false,
        errors: payload,
        status: "",
      };
    case POST_CATEGORIES:
      return {
        ...state,
        categories: addNewCategory(state.categories, payload),
        category: payload,
        loading: false,
        status: `${payload.name} was added.`,
        errors: "",
      };
    case POST_CATEGORIES_FAIL:
      return {
        ...state,
        errors: payload,
        status: "",
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: updateCategoriesArray(state.categories, payload),
        category: payload,
        loading: false,
        status: `${payload.name} was updated.`,
        errors: "",
      };
    case UPDATE_CATEGORIES_FAIL:
      return {
        ...state,

        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
