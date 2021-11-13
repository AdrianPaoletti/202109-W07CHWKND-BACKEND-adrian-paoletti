/* eslint-disable no-underscore-dangle */
const debug = require("debug")("socialMedia:socialNetwrokController");
const chalk = require("chalk");
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
  try {
    const friend = req.body;
    const friendToAdd = await User.findOne({ "username": friend.username });
    if (friendToAdd) {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        user.friends = [...user.friends, friendToAdd._id];
        await user.save(user);
        res.json(friendToAdd);
      }
      else {
        const error = new Error("Could not find user to add friend");
        error.code = 404;
        next(error);
      }
    } else {
      const error = new Error("Could not find friend");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete on addfriend";
    next(error);
  }
}

const removeFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const friendToRemove = await User.findOne({ _id: id });
    if (friendToRemove) {
      const user = await User.findOne({ _id: req.userId });

      if (user) {
        user.friends = user.friends.filter((friend) => friend._id.toString() !== friendToRemove._id.toString())
        await user.save(user);
        res.json(user.friends);
      }
      else {
        const error = new Error("Could not find user to remove friend");
        error.code = 404;
        next(error);
      }
    } else {
      const error = new Error("Could not find friend");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete on removefriend";
    next(error);
  }
}

module.exports = {
  getUsers,
  getFriends,
  addFriend,
  removeFriend,
}