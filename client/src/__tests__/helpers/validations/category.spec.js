import {
  validateObjectToHaveProperty,
  validateObjectDataType,
} from "../../utils/testUtils";
import categoryValidator from "./../../../helpers/validations/categoryValidator";

describe(" validator", () => {
  let inputs;
  it("should return null ", () => {
    inputs = {
      name: "Joao",
      color: "blue",
    };

    expect(categoryValidator(inputs)).toBeNull();
  });

  it("should return object with name and color ", () => {
    inputs = {
      name: "Jo",
    };

    validateObjectToHaveProperty(categoryValidator(inputs), "name");
    validateObjectToHaveProperty(categoryValidator(inputs), "color");
    validateObjectDataType(categoryValidator(inputs));
  });
});
