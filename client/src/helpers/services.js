import { categoryName } from "./globalVar";

const { LIBRARY, FRAMEWORK, DATABASE, COLLABORATION, TESTING, LANGUAGE } =
  categoryName;

export const findColumn = (columns, columnName) => {
  return columns.find((e) => e[0] == columnName);
};

export const getBgPerCategory = (category) => {
  switch (category) {
    case FRAMEWORK:
      return "teal";
    case LIBRARY:
      return "gray";
    case LANGUAGE:
      return "blue";
    case DATABASE:
      return "yellow";
    case COLLABORATION:
      return "red";
    case TESTING:
      return "magenta";
  }
};

export default function calculatePercentage(total, value) {
  return Math.round((value / total) * 100);
}
