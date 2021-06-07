import {
  findColumn,
  calculatePercentage,
  capitalize,
} from "../../helpers/services";

describe("testing services", () => {
  let columns;
  describe("findColumn", () => {
    columns = [
      ["hot", { likes: "1" }],
      ["cold", { likes: "1" }],
      ["pool", { likes: "1" }],
    ];
    it("should return the first array element", () => {
      expect(findColumn(columns, "hot")).toEqual(columns[0]);
    });

    it("should undefined", () => {
      expect(findColumn(columns, "none")).toBeUndefined();
    });
  });
  describe("calculatePercentage", () => {
    it("should return 10", () => {
      expect(calculatePercentage(100, 10)).toEqual(10);
    });
  });

  describe("capitalize", () => {
    it("should modify string", () => {
      expect(capitalize("hello")).toEqual("Hello");
    });
  });
});
