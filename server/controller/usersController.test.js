const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");
const { registerUser } = require("./usersController")
const { loginUser } = require("./usersController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a userController controller", () => {
  describe("When register function is invoke with username and password that doesn't already exist", () => {
    test("Then it should create a new user", async () => {
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }

      const user = req.body;
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn()
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue({ ...user, password: "raul" });
      bcrypt.hash = jest.fn().mockResolvedValue("raul");
      await registerUser(req, res, next);

      expect(User.create).toHaveBeenCalledWith({ ...user, password: "raul" })
    })
  })

  describe("When register function is invoke with an existent username", () => {
    test("Then it should reject a new error with a 404 code", async () => {
      const error = new Error("Username already exists CHANGE IT");
      error.code = 404;
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn()
      User.findOne = jest.fn().mockResolvedValue("raul");
      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    })
  })

  describe("When register function is invoke with findOne method and that one doesn't find username", () => {
    test("Then it should reject a new error with a 400 code", async () => {
      const error = new Error();
      error.code = 400;
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn()
      User.findOne = jest.fn().mockRejectedValue({});
      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    })
  })

  describe("When register function is invoke and create methodgets rejected", () => {
    test("Then it should invoke next funcion with a new error and 400 code", async () => {
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }

      const user = req.body;
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn()
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("raul");
      User.create = jest.fn().mockResolvedValue(null);
      const expectedError = new Error("Not posibol to create User");
      expectedError.code = 404;

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When login function is invoke and it receives a wrong username", () => {
    test("Then it should invoke next function with an 401 error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Login Naranai");
      expectedError.code = 401;

      await loginUser(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it receives a right username and a wrong password", () => {
    test("Then it should invoke next function with a 401 error", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "2",
        name: "raul",
        username: "raul",
        password: "raul",
        age: 100,
      });
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }
      const next = jest.fn().mockResolvedValue(false);
      bcrypt.compare = jest.fn();
      const expectedError = new Error("Oju! Wrong Password!");
      expectedError.code = 401;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it receibes a right username and password", () => {
    test("Then it should invoke res.json with a brand new token inside", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "1",
        name: "raul",
        username: "raul",
        password: "raul",
        age: 100,
      })
      const expectedToken = "asdf";
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }
      const res = {
        json: jest.fn()
      }
      const expectedResponse = {
        token: expectedToken
      }

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    })
  })

  describe("When findOne function gets rejected", () => {
    test("Then it should invoke next function with an error code 400", async () => {
      const req = {
        body: {
          name: "raul",
          username: "raul",
          password: "raul",
          age: 100,
        }
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockRejectedValue({});
      const expectedError = new Error("General pete login");
      expectedError.code = 400;

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);

    })
  })
})