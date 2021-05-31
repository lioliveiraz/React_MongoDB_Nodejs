import http from "../httpRequest";

export const registerNewUser = async (userObject) => {
  const response = await http.post("/users", userObject);
  return response;
};

export const login = async (userObject) => {
  const response = await http.post("/login", userObject);
  return response;
};

export const registerProfile = async (profileObj, token) => {
  const response = await http.post("/profile", profileObj, {
    headers: { Authorization: "Bearer " + token },
  });

  return response;
};

export const registerNewCategory = async (categoryObject, token) => {
  const response = await http.post("/categories", categoryObject, {
    headers: { Authorization: "Bearer " + token },
  });

  return response;
};

export const registerTech = async (technologyObject, token) => {
  const response = await http.post("/techs", technologyObject, {
    headers: { Authorization: "Bearer " + token },
  });

  return response;
};
