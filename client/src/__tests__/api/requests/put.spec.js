import axios from "axios";
import {
  updateWallAPI,
  updateVoteAPI,
  updateCategory,
} from "./../../../api/requests/put";

jest.mock("axios", () => ({
  defaults: {
    baseUrl: "http://localhost:4020/",
  },

  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  put: jest.fn(() => Promise.resolve({})),
  put: jest.fn(() => Promise.rejects({})),
}));
afterEach(() => {
  jest.clearAllMocks();
});

describe("text axios put request", () => {
  let token, wallUpdatedData, id, column, color, error;
  token = "token";
  wallUpdatedData = { id: 2 };
  id = 2;
  column = "hot";
  color = "yellow";

  it("should send data to server and retrieve a response", async () => {
    status = 200;
    axios.put.mockResolvedValue(status);
    await expect(updateWallAPI(wallUpdatedData, token)).resolves.toEqual(
      status
    );
    await expect(updateVoteAPI(id, column, token)).resolves.toEqual(status);
    await expect(updateCategory(id, color, token)).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(3);
  });
});
