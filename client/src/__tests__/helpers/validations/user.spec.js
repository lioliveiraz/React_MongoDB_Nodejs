import {
  validateObjectToHaveProperty,
  validateObjectDataType,
} from "../../utils/testUtils";
import userValidator from "./../../../helpers/validations/userValidator";

describe(" validator", () => {
  let inputs;
  it("should return null ", () => {
    inputs = {
      name: "Maria Souza",
      email: "mariasouza@email.com",
      password: "1234567A",
    };

    expect(userValidator(inputs)).toBeNull();
  });

  it("should return object with name,email,password  ", () => {
    inputs = {
      name: "_",
      email: "mariasouza",
      password: "1234567A",
    };

    validateObjectToHaveProperty(userValidator(inputs), "name");
    validateObjectToHaveProperty(userValidator(inputs), "email");

    validateObjectDataType(userValidator(inputs));
  });
});
