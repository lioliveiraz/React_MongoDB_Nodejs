import http from "../httpRequest";

export const fetchTechs = async () => {
  const response = await http.get("/techs");
  return response.data;
};

export const fetchMyProfile = async (token) => {
  const response = await http.get("/profile/me", {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const fetchMyWall = async (token) => {
  const response = await http.get("/wall/me", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
