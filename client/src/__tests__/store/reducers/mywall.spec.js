import myWall from "../../../store/reducers/myWall";
import {
  UPDATE_WALL,
  GET_MY_WALL,
  PUSH_NOTIFICATION,
} from "../../../store/actions/types";

describe("reducers", () => {
  describe("my wall", () => {
    let initialState = {
      techs: {
        hot: [],
        cold: [],
        pool: [],
      },
      notification: 0,
    };

    it("should return initial state", () => {
      expect(myWall(undefined, {})).toMatchObject(initialState);
    });
    it("should return the wall", () => {
      initialState = {
        techs: {
          hot: [],
          cold: [],
          pool: [{ name: "framework" }],
        },
        notification: 0,
      };
      const action = {
        type: GET_MY_WALL,
        payload: { hot: [], cold: [], pool: [{ name: "framework" }] },
      };
      expect(myWall(undefined, action)).toMatchObject(initialState);
    });
    it("should update state", () => {
      const action = {
        type: UPDATE_WALL,
      };
      initialState = {
        ...initialState,
        techs: {
          ...initialState.techs,
          pool: [],
        },
      };
      expect(myWall(undefined, action)).toMatchObject(initialState);
    });
  });
});
