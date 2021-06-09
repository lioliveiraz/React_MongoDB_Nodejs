import auth from "../../../store/reducers/auth";
import {
  LOGIN_FAIL,
  LOGIN_SUCCEED,
  LOGOUT,
} from "../../../store/actions/types";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiYTBlYTZlZWIxYzY1ZTUwZDEyYTE5IiwiYWRtIjpmYWxzZX0sImlhdCI6MTYyMzEzOTQ2MSwiZXhwIjoxNjIzMjI1ODYxfQ.K4_8M-YQAXoSVNCbAGXOJj-TpEZ5Uu_zei9iXTCuNuo";
describe("reducers", () => {
  describe("auth", () => {
    let initialState = {
      token: null,
      isAuthenticated: false,
      loading: true,
      user: false,
      errors: null,
      adm: false,
    };

    it("should return initial state", () => {
      expect(auth(undefined, {})).toMatchObject(initialState);
    });
    it("should create an user", () => {
      const action = { type: LOGIN_SUCCEED, payload: myToken };
      const state = {
        adm: false,
        errors: null,
        isAuthenticated: true,
        loading: false,
        token: myToken,
        user: "60ba0ea6eeb1c65e50d12a19",
      };
      expect(auth(undefined, action)).toMatchObject(state);
    });
    it("should destroy user", () => {
      const action = { type: LOGOUT };
      initialState = {
        ...initialState,
        loading: false,
      };
      expect(auth(undefined, action)).toMatchObject(initialState);
    });

    it("should login fail ", () => {
      const action = { type: LOGIN_FAIL, payload: "error" };
      initialState = {
        ...initialState,
        loading: false,
        errors: "error",
      };
      expect(auth(undefined, action)).toMatchObject(initialState);
    });
  });
});
