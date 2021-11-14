const User = require("../../database/models/user");
const { getUsers, getFriends, getEnemies, addFriend, removeFriend, addEnemy, removeEnemy, updateUser } = require("./socialNetworkController");

jest.mock("../../database/models/user");

describe("Given a getUsers function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const users = [
        {
          name: "pepo",
          username: "pepo",
          password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
          age: 150,
          friends: [
            "618d468881c83b20249f3ea5"
          ],
          enemies: [
            "618d468881c83b20249f3ea5"
          ],
          image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
          __v: 0,
          id: "618fc3a0be17f526959346b7"
        },
        {
          name: "pepo",
          username: "pepo",
          password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
          age: 150,
          friends: [
            "618d468881c83b20249f3ea5"
          ],
          enemies: [
            "618d468881c83b20249f3ea5"
          ],
          image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
          __v: 0,
          id: "618fc3a0be17f526959346b6"
        }
      ];

      User.find = jest.fn().mockResolvedValue(users);
      const res = {
        json: jest.fn()
      }
      await getUsers(null, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    })
  })

  describe("When there is anything to find", () => {
    test("Then it should return an error with code 400", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.find = jest.fn().mockRejectedValue({});
      const expectedError = new Error("General pete getUsers");
      expectedError.code = 400;

      await getUsers(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it gets an not existent user", () => {
    test("Then it should return an error with code 400", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.find = jest.fn().mockResolvedValue(null);
      const expectedError = new Error("Could not get users");
      expectedError.code = 404;

      await getUsers(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a getFriends function", () => {
  describe("When it receives a request with the correct user", () => {
    test("Then it should invoke the method json with the property friends", async () => {
      const user =
      {
        name: "pepo",
        username: "pepo",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        id: "618fc3a0be17f526959346b7"
      };
      const req = {
        json: jest.fn()
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(user) });

      await getFriends(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user.friends);
    })
  })

  describe("When it gets a wrong existent user", () => {
    test("Then it should return an error with code 404", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
      const expectedError = new Error("Could not get userFriends");
      expectedError.code = 404;

      await getFriends(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it gets an not existent user", () => {
    test("Then it should return an error with code 400", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockRejectedValue();
      const expectedError = new Error("General pete getFriends");
      expectedError.code = 400;

      await getFriends(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a getEnemies function", () => {
  describe("When it receives a request with the correct user", () => {
    test("Then it should invoke the method json with the propertie enemies", async () => {
      const user =
      {
        name: "pepo",
        username: "pepo",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        id: "618fc3a0be17f526959346b7"
      };
      const req = {
        json: jest.fn()
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(user) });

      await getEnemies(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user.enemies);
    })
  })

  describe("When it gets a wrong existent user", () => {
    test("Then it should return an error with code 404", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
      const expectedError = new Error("Could not get userEnemies");
      expectedError.code = 404;

      await getEnemies(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it gets an not existent user", () => {
    test("Then it should return an error with code 400", async () => {
      const req = jest.fn();
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockRejectedValue();
      const expectedError = new Error("General pete userEnemies");
      expectedError.code = 400;

      await getEnemies(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a addFriend function", () => {
  describe("When it receives a request with the correct user to add", () => {
    test("Then it should invoke the method json with the propertie enemies", async () => {
      const usertoAdd =
      {
        name: "pepo",
        username: "pepo",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const userLogged =
      {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(usertoAdd);
      User.findById = jest.fn().mockResolvedValue(userLogged);

      await addFriend(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(usertoAdd);
    })
  })

  describe("When it receives a request with the incorrect body structure", () => {
    test("Then it should invoke next function with an error code 400", async () => {
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("General pete on addfriend");
      expectedError.code = 400;
      User.findOne = jest.fn().mockRejectedValue({});

      await addFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a null finOne user", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find friend");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(null);

      await addFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a correct finOne user but doesn't find loggin Id", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find user to add friend");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(null);

      await addFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a removeFriend function", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should invoke res.json function ", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          { _id: 1 },
          { _id: 1 },
          { _id: 1 },
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: 1
      };
      const userLogged =
      {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          { _id: 1 },
          { _id: 1 },
          { _id: 1 },
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: { id: 1 }
      };
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(userLogged);
      const id = 1;
      const req = {
        params: {
          id,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn()

      await removeFriend(req, res, next);

      expect(res.json).toHaveBeenCalled();
    })
  })

  describe("When it receives a request with the incorrect id", () => {
    test("Then it should invoke next function with an error code 400", async () => {
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("General pete on removefriend");
      expectedError.code = 400;
      User.findOne = jest.fn().mockRejectedValue({});

      await removeFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves a null id", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find friend");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(null);

      await removeFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a correct findOne user but doesn't findById", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find user to remove friend");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(null);

      await removeFriend(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a addEnemy function", () => {
  describe("When it receives a request with the correct user to add", () => {
    test("Then it should invoke the method json with the propertie enemies", async () => {
      const usertoAdd =
      {
        name: "pepo",
        username: "pepo",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const userLogged =
      {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(usertoAdd);
      User.findById = jest.fn().mockResolvedValue(userLogged);

      await addEnemy(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(usertoAdd);
    })
  })

  describe("When it receives a request with the incorrect body structure", () => {
    test("Then it should invoke next function with an error code 400", async () => {
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("General pete on addEnemie");
      expectedError.code = 400;
      User.findOne = jest.fn().mockRejectedValue({});

      await addEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a null finOne user", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find enemie");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(null);

      await addEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a correct finOne user but doesn't find loggin Id", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        body: jest.fn(),
      }
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find user to add enemie");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(null);

      await addEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given a removeEnemy function", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should invoke res.json function ", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          { _id: 1 },
          { _id: 1 },
          { _id: 1 },
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: 1
      };
      const userLogged =
      {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          { _id: 1 },
          { _id: 1 },
          { _id: 1 },

        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: { id: 1 }
      };
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(userLogged);
      const id = 1;
      const req = {
        params: {
          id,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn()

      await removeEnemy(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(userLogged.enemies);
    })
  })

  describe("When it receives a request with the incorrect id", () => {
    test("Then it should invoke next function with an error code 400", async () => {
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("General pete on removeEnemy");
      expectedError.code = 400;
      User.findOne = jest.fn().mockRejectedValue({});

      await removeEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves a null id", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find enemy");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(null);

      await removeEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })

  describe("When it resolves to a correct findOne user but doesn't findById", () => {
    test("Then it should invoke next function with an error code 404", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        params: {
          id: null,
        }
      };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const expectedError = new Error("Could not find user to remove enemy");
      expectedError.code = 404;
      User.findOne = jest.fn().mockResolvedValue(user);
      User.findById = jest.fn().mockResolvedValue(null);

      await removeEnemy(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})

describe("Given an updateUser function", () => {
  describe("When it receives a, request with a correct body, a response and a next function", () => {
    test("Then it should invoke res.json with the result of the update", async () => {
      const user = {
        name: "ramon",
        username: "ramon",
        password: "$2b$10$Cxh9L7Cl1n/ELi6dxIMxFOZ4hgV7vFHtCL/yHnWbPdq1INZsnF/Di",
        age: 150,
        friends: [
          "618d468881c83b20249f3ea5"
        ],
        enemies: [
          "618d468881c83b20249f3ea5"
        ],
        image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        __v: 0,
        _id: "618fc3a0be17f526959346b7"
      };
      const req = {
        body: user
      }
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();

      await updateUser(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(req.body);
    })
  })
  describe("When it receives an incorrect body format", () => {
    test("Then it should invoke next function with an error and error.code 400", async () => {
      const next = jest.fn();
      const res = jest.fn();
      const req = {
        body: {}
      }
      const expectedError = new Error("General pete on removeEnemy");
      expectedError.code = 400;
      User.findByIdAndUpdate = jest.fn().mockRejectedValue({});

      await updateUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
  describe("When it receives a falsy findByIdAndUpdate request", () => {
    test("Then it should invoke next function with an error and error.code 404", async () => {
      const next = jest.fn();
      const res = jest.fn();
      const req = {
        body: {}
      }
      const expectedError = new Error("Not posibol to update");
      expectedError.code = 404;
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateUser(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    })
  })
})