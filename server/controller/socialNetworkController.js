/* eslint-disable no-underscore-dangle */
const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.json(users);
    }
    else {
      const error = new Error("Could not get users");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete getUsers";
    next(error);
  }
}

const getFriends = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
      .populate({
        path: "friends"
      })
    if (user) {
      res.json(user.friends)
    } else {
      const error = new Error("Could not get userFriends");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete getFriends";
    next(error);
  }
}

const addFriend = async (req, res, next) => {
  const friend = req.body;
  const newFriend = await User.create(friend);
  const user = await User.findOne({ _id: req.userId });
  user.friends = [...user.friends, newFriend._id];
  await user.save(user);
}

module.exports = {
  getUsers,
  getFriends,
  addFriend
}