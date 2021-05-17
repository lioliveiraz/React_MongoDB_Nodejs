import http from "../httpRequest";

export const updateWallAPI = async (wallUpdatedData, token) => {
  const res = await http.put("/wall/update-wall", wallUpdatedData, {
    headers: { Authorization: "Bearer " + token },
  });
  return res;
};

export const updateVoteAPI = async (id, userVote, token) => {
  const updated = {
    id,
    userVote,
  };
  const res = await http.put("/techs/vote", updated, {
    headers: { Authorization: "Bearer " + token },
  });
  return res;
};