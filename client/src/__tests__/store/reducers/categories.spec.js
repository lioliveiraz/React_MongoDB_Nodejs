import categories from "./../../../store/reducers/categories";
import {
  POST_CATEGORIES,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORIES_FAIL,
  POST_CATEGORIES_FAIL,
} from "../../../store/actions/types";

describe("reducers", () => {
  let error = "error";
  describe("categories", () => {
    let state = {
      categories: [],
      category: {},
      loading: true,
      status: "",
      errors: "",
    };

    it("should return initial state", () => {
      expect(categories(undefined, {})).toMatchObject(state);
    });
    it("should  get categories", () => {
      const action = {
        type: GET_CATEGORIES,
        payload: [{ name: "framework" }],
      };
      state = {
        ...state,
        loading: false,
        categories: [{ name: "framework" }],
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });

    it("should not get categories", () => {
      const action = { type: GET_CATEGORIES_FAIL, payload: error };
      state = {
        ...state,
        categories: [],
        loading: false,
        errors: error,
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });
    it("should post categories", () => {
      const action = {
        type: POST_CATEGORIES,
        payload: { name: "library" },
      };
      state = {
        ...state,
        categories: [{ name: "library" }],
        loading: false,
        errors: "",
        category: { name: "library" },
        status: "library was added.",
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });
    it("should post categories fail", () => {
      const action = {
        type: POST_CATEGORIES_FAIL,
        payload: error,
      };
      state = {
        categories: [{ name: "library" }],

        category: {},
        loading: true,
        status: "",
        errors: error,
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });
    it("should update categories ", () => {
      const action = {
        type: UPDATE_CATEGORIES,
        payload: { name: "library", color: "blue" },
      };
      state = {
        categories: [{ name: "library", color: "blue" }],

        category: { name: "library", color: "blue" },
        loading: false,
        status: "library was updated.",
        errors: "",
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });
    it("should update categories fail", () => {
      const action = {
        type: UPDATE_CATEGORIES_FAIL,
        payload: error,
      };
      state = {
        categories: [{ name: "library", color: "blue" }],

        category: {},
        loading: false,
        status: "",
        errors: error,
      };
      expect(categories(undefined, action)).toMatchObject(state);
    });
  });
});
