const { notFoundErrorHandler, generalErrorHandler } = require("./error");

describe("Given a notFoundErrorHandler", () => {
  describe("When it receives a null request", () => {
    test("Then it should return an error with 404 code and message Not Endpoint found", () => {
      const expectedError = new Error("Not Endpoint found");
      expectedError.code = 404;
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn().mockResolvedValue(expectedError) })
      }

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedError.code);
    })
  })
})