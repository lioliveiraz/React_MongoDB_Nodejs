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
