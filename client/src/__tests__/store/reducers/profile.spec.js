import profile from "../../../store/reducers/profile";
import {
  GET_ALL_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
} from "../../../store/actions/types";

describe("reducers", () => {
  const error = "error";
  describe("profile", () => {
    let initialState = {
      profile: null,
      profiles: [],
      loading: true,
      status: null,
    };

    it("should return initial state", () => {
      expect(profile(undefined, {})).toMatchObject(initialState);
    });
    it("should return get profiles", () => {
      const action = { type: GET_PROFILE, payload: { name: "joao" } };
      initialState = {
        ...initialState,
        profile: { name: "joao" },
        loading: false,
      };
      expect(profile(undefined, action)).toMatchObject(initialState);
    });
    it("should return error", () => {
      const action = { type: PROFILE_ERROR, payload: error };
      initialState = {
        ...initialState,
        loading: true,
        profile: null,
        status: error,
      };
      expect(profile(undefined, action)).toMatchObject(initialState);
    });
    it("should update profile", () => {
      const action = { type: UPDATE_PROFILE, payload: { name: "Joao" } };
      initialState = {
        ...initialState,
        loading: false,
        profile: { name: "Joao" },
        status: "Your profile was updated",
      };
      expect(profile(undefined, action)).toMatchObject(initialState);
    });
    it("should return error when try to update profile", () => {
      const action = { type: UPDATE_PROFILE_FAIL, payload: error };
      initialState = {
        ...initialState,
        loading: true,
        profile: null,
        status: error,
      };
      expect(profile(undefined, action)).toMatchObject(initialState);
    });

    it("should get all profiles", () => {
      const action = {
        type: GET_ALL_PROFILES,
        payload: [{ name: "profile1" }, { name: "profile2" }],
      };
      initialState = {
        ...initialState,
        profiles: [{ name: "profile1" }, { name: "profile2" }],
        status: null,
      };
      expect(profile(undefined, action)).toMatchObject(initialState);
    });
  });
});
