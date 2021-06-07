import {
  validateObjectToHaveProperty,
  validateObjectDataType,
} from "../../utils/testUtils";
import profileValidator from "./../../../helpers/validations/profileValidator";

describe(" validator", () => {
  let inputs, error;
  it("should return null ", () => {
    inputs = {
      bio: "placeat qui iure odio laboriosam aut reiciendis eos sed quasi id nesciunt quibusdam voluptatem quae ad repudiandae incidunt aliquam est ",
      skills: ["placeat", "qui iure", "odio laboriosam"],
      role: "Developer",
      githubusername: "username",
      youtube: "username",
      twitter: "username",
      linkedin: "username",
    };

    expect(profileValidator(inputs)).toBeNull();
  });

  it("should return object with role and bio ", () => {
    inputs = {
      bio: "est ",
      role: "De",
    };

    validateObjectToHaveProperty(profileValidator(inputs), "bio");
    validateObjectToHaveProperty(profileValidator(inputs), "role");
    validateObjectDataType(profileValidator(inputs));
  });

  it("should return object with  a skills error saying that data type should be an array  ", () => {
    inputs = {
      skills: "est",
    };

    error = {
      skills: '"skills" must be an array',
    };

    expect(profileValidator(inputs)).toEqual(expect.objectContaining(error));
    validateObjectToHaveProperty(profileValidator(inputs), "skills");
    validateObjectDataType(profileValidator(inputs));
  });
});
