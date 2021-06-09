import survey from "../../../store/reducers/survey";
import { GET_SURVEY } from "../../../store/actions/types";

describe("reducers", () => {
  const error = "error";
  describe("survey", () => {
    let initialState = {
      techs: [],
    };

    it("should return initial state", () => {
      expect(survey(undefined, {})).toMatchObject(initialState);
    });
    it("should return initial state", () => {
      const action = { type: GET_SURVEY, payload: [{ name: "React" }] };
      initialState = {
        techs: [{ name: "React" }],
      };
      expect(survey(undefined, action)).toMatchObject(initialState);
    });
  });
});
