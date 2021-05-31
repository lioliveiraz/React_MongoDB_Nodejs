import http from "../httpRequest";

export const updateWallAPI = async (wallUpdatedData, token) => {
  const res = await http.put("/wall/update-wall", wallUpdatedData, {
    headers: { Authorization: "Bearer " + token },
  });
  return res;
};

export const updateVoteAPI = async (id, column, token) => {
  const updated = {
    id,
    column,
  };
  const res = await http.put("/techs/vote", updated, {
    headers: { Authorization: "Bearer " + token },
  });
  return res;
};

export const updateCategory = async (id, color, token) => {
  const res = await http.put(
    `/categories/${id}`,
    { color },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return res;
};
