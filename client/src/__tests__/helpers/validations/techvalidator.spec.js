import {
  validateObjectToHaveProperty,
  validateObjectDataType,
} from "../../utils/testUtils";
import techValidator from "./../../../helpers/validations/techValidator";

describe(" validator", () => {
  let inputs;
  it("should return null ", () => {
    inputs = {
      name: "React",
      description:
        "React is an open-source, front end, JavaScript library for building user interfaces or UI components.",
      category: "1A",
      creator: "Facebook",
    };

    expect(techValidator(inputs)).toBeNull();
  });

  it("should return object with name,description,creator and category ", () => {
    inputs = {
      name: "_",
      description: "descrip",
      category: "_1",
      creator: "Fa",
    };

    validateObjectToHaveProperty(techValidator(inputs), "name");
    validateObjectToHaveProperty(techValidator(inputs), "category");
    validateObjectDataType(techValidator(inputs));
  });
});
