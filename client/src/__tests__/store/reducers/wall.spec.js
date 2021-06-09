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
    let initialState = {
      hot: [],
      cold: [],
      pool: [],
      warm: [],
      status: "",
      errors: [],
    };

    it("should return initial state", () => {
      expect(wall(undefined, {})).toMatchObject(initialState);
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

    it("should return initial state", () => {
      const action = {
        type: UPDATE_WALL,
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
        status: "",
        errors: error,
      };
      expect(wall(undefined, action)).toMatchObject(initialState);
    });
  });
});
