import http from "../httpRequest";

export const registerNewUser = async (userObject) => {
  const response = await http.post("/users", userObject);
  return response;
};

export const login = async (userObject) => {
  const response = await http.post("/login", userObject);
  return response;
};
