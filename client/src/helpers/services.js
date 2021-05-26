import { categoryName } from "./globalVar";

const { LIBRARY, FRAMEWORK, DATABASE, COLLABORATION, TESTING, LANGUAGE } =
  categoryName;

export const findColumn = (columns, columnName) => {
  return columns.find((e) => e[0] == columnName);
};

export const getBgPerCategory = (category) => {
  switch (category) {
    case FRAMEWORK:
      return "#6D7345";
    case LIBRARY:
      return "#D4C1D9";
    case LANGUAGE:
      return "#D98673";
    case DATABASE:
      return "#A64E46";
    case COLLABORATION:
      return "#79AEF2";
    case TESTING:
      return "teal";
  }
};

export function calculatePercentage(total, value) {
  return Math.round((value / total) * 100);
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
