export const findColumn = (columns, columnName) => {
  return columns.find((e) => e[0] === columnName);
};

export function calculatePercentage(total, value) {
  return Math.round((value / total) * 100);
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
