import axios from "axios";
import { TokenExpiredError } from "jsonwebtoken";
import {
  registerNewUser,
  login,
  registerProfile,
  registerNewCategory,
  registerTech,
} from "./../../../api/requests/post";

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
  post: jest.fn(() => Promise.resolve({})),
  post: jest.fn(() => Promise.rejects({})),
}));
afterEach(() => {
  jest.clearAllMocks();
});
describe("text axios post request", () => {
  let token, userObject, profileObject, categoryObject, technologyObject, error;
  userObject = {
    email: "joao@email.com",
    password: "123456",
  };

  profileObject = {
    id: 1,
  };
  categoryObject = {
    id: 1,
  };
  technologyObject = {
    id: 1,
  };
  error = "error";
  token = "token";

  it("should send data to server and retrieve a response", async () => {
    status = 200;
    axios.post.mockResolvedValue(status);

    await expect(registerNewUser(userObject)).resolves.toEqual(status);
    await expect(login(userObject)).resolves.toEqual(status);
    await expect(registerProfile(profileObject, token)).resolves.toEqual(
      status
    );
    await expect(registerNewCategory(categoryObject, token)).resolves.toEqual(
      status
    );
    await expect(registerTech(technologyObject, token)).resolves.toEqual(
      status
    );
    expect(axios.post).toHaveBeenCalledTimes(5);
    expect(axios.post).toHaveBeenNthCalledWith(1, "/users", userObject);
    expect(axios.post).toHaveBeenNthCalledWith(2, "/login", userObject);
    expect(axios.post).toHaveBeenNthCalledWith(3, "/profile", profileObject, {
      headers: { Authorization: "Bearer " + token },
    });
    expect(axios.post).toHaveBeenNthCalledWith(
      4,
      "/categories",
      categoryObject,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    expect(axios.post).toHaveBeenNthCalledWith(5, "/techs", technologyObject, {
      headers: { Authorization: "Bearer " + token },
    });
  });

  it("should fail and retrieve a response", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(registerNewUser(userObject)).rejects.toThrow(error);
    await expect(login(userObject)).rejects.toThrow(error);
    await expect(registerProfile(profileObject, token)).rejects.toThrow(error);
    await expect(registerTech(categoryObject, token)).rejects.toThrow(error);
    await expect(registerProfile(technologyObject, token)).rejects.toThrow(
      error
    );
  });
});
