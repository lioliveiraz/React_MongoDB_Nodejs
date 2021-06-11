import wall from "../../../store/reducers/wall";
import {
  GET_WALL,
  UPDATE_WALL,
  CREATE_NEW_TECH,
  CREATE_NEW_TECH_FAIL,
} from "../../../store/actions/types";

describe("reducers", () => {
  const error = "error";
  describe("wall", () => {
    let initialState;

    it("should return initial state", () => {
      initialState = {
        hot: [],
        cold: [],
        pool: [],
        warm: [],
        status: "",
        errors: [],
      };
      expect(wall(undefined, { type: "NULL" })).toMatchObject(initialState);
    });

    it("should return all the techs", () => {
      const action = {
        type: GET_WALL,
        payload: { hot: [], cold: [], pool: [{ name: "framework" }], warm: [] },
      };
      initialState = {
        ...initialState,
        pool: [{ name: "framework" }],
      };
      expect(wall(undefined, action)).toMatchObject(initialState);
    });

    it("should update and  return initial state", () => {
      const action = {
        type: UPDATE_WALL,
      };

      initialState = {
        ...initialState,
        pool: [],
      };

      expect(wall(undefined, action)).toMatchObject(initialState);
    });

    it("should return a success message", () => {
      const action = {
        type: CREATE_NEW_TECH,
        payload: "Your tech was created",
      };
      initialState = {
        ...initialState,
        status: "Your tech was created",
      };
      expect(wall(undefined, action)).toMatchObject(initialState);
    });
    it("should return an error message", () => {
      const action = {
        type: CREATE_NEW_TECH_FAIL,
        payload: error,
      };
      initialState = {
        ...initialState,
        pool: [],
        status: "",
        errors: error,
      };
      expect(wall(undefined, action)).toMatchObject(initialState);
    });
  });
});
