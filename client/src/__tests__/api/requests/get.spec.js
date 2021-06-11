import axios from "axios";
import {
  fetchTechs,
  fetchMyProfile,
  fetchDeveloperProfile,
  fetchMyWall,
  fetchDevelopers,
  fetchCategories,
} from "./../../../api/requests/get";

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
  get: jest.fn(() => Promise.resolve({})),
  get: jest.fn(() => Promise.rejects({})),
}));

describe("test axios get requests", () => {
  let response = {
    data: {
      techs: [{ id: 1 }],
    },
  };
  let token = "token";
  let error = {
    message: "this is an error",
  };

  describe("fetchTechs", () => {
    it("should fetch data", async () => {
      axios.get.mockResolvedValue(response);
      await expect(fetchTechs()).resolves.toEqual(response.data);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchTechs()).rejects.toThrow(error.message);
    });
  });
  describe("fetchMyProfile", () => {
    it("should fetch data", async () => {
      response = {
        data: {
          profile: { id: 1 },
        },
      };
      axios.get.mockResolvedValue(response);
      await expect(fetchMyProfile(token)).resolves.toEqual(response);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchMyProfile(token)).rejects.toThrow(error.message);
    });
  });

  describe("fetchDeveloperProfile", () => {
    it("should fetch data", async () => {
      response = {
        data: {
          profile: { id: 1 },
        },
      };
      axios.get.mockResolvedValue(response);
      await expect(fetchDeveloperProfile(token)).resolves.toEqual(
        response.data
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchDeveloperProfile(token)).rejects.toThrow(error.message);
    });
  });
  describe("fetchMyWall", () => {
    it("should fetch data", async () => {
      response = {
        data: {
          profile: { id: 1 },
        },
      };
      axios.get.mockResolvedValue(response);
      await expect(fetchMyWall(token)).resolves.toEqual(response.data);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchMyWall(token)).rejects.toThrow(error.message);
    });
  });
  describe("fetchDevelopers", () => {
    it("should fetch data", async () => {
      response = {
        data: {
          profile: { id: 1 },
        },
      };
      axios.get.mockResolvedValue(response);
      await expect(fetchDevelopers()).resolves.toEqual(response.data);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchDevelopers()).rejects.toThrow(error.message);
    });
  });
  describe("fetchCategories", () => {
    it("should fetch data", async () => {
      response = {
        data: {
          categories: [{ id: 1 }],
        },
      };
      axios.get.mockResolvedValue(response);
      await expect(fetchCategories()).resolves.toEqual(response.data);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should fail with a response", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject(new Error(error.message))
      );
      await expect(fetchCategories()).rejects.toThrow(error.message);
    });
  });
});
