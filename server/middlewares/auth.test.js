const jwt = require("jsonwebtoken");
const Auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given an auth function", () => {
  describe("When it receives an unauthorized function", () => {
    test("Then it should invoke next function with an error 401", () => {
      const req = {
        header: jest.fn(),
      }
      const next = jest.fn();
      const res = jest.fn()
      const expectedError = new Error("Nono t no register");
      expectedError.code = 401;

      Auth(req, res, next)

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
  describe("When it receives an authorized function but and incorrect token", () => {
    test("Then it should invoke next function with an error 401", () => {
      const req = {
        header: jest.fn().mockReturnValue("546"),
      }
      const next = jest.fn();
      const res = jest.fn()
      const expectedError = new Error("Token incorrect");
      expectedError.code = 401;

      Auth(req, res, next)

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
  describe("When it receives an a correct token", () => {
    test("Then it should invoke next function with an error 401", () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer SalamMalecum"
          ),
      };
      jwt.verify = jest.fn().mockReturnValue({
        id: "malecumSalama",
        username: "ramiro",
        password: "tsahalafrasek",
        name: "ramiro",
        friends: [],
        enemies: [],
      });
      const next = jest.fn();
      const res = jest.fn()

      Auth(req, res, next)

      expect(next).toHaveBeenCalled();
    })
  })
})