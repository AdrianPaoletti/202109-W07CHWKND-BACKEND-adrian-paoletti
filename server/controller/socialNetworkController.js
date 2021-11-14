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

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    const userFind = await User.findById(id);
    if (userFind) {
      res.json(userFind);
    }
    else {
      const error = new Error("Could not get user by id");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete getUserById";
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

const getEnemies = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
      .populate({
        path: "enemies"
      })
    if (user) {
      res.json(user.enemies)
    } else {
      const error = new Error("Could not get userEnemies");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete userEnemies";
    next(error);
  }
}

const addFriend = async (req, res, next) => {
  try {
    const friend = req.body;
    const friendToAdd = await User.findOne({ "username": friend.username });
    if (friendToAdd) {
      const user = await User.findById(req.userId);
      if (user) {
        user.friends = [...user.friends, friendToAdd._id];
        res.json(friendToAdd);
        await user.save();
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
      const user = await User.findById(req.userId);
      if (user) {
        user.friends = user.friends.filter((friend) => friend._id.toString() !== friendToRemove._id.toString())
        res.json(user.friends);
        await user.save();
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

const addEnemy = async (req, res, next) => {
  try {
    const enemy = req.body;
    const enemyToAdd = await User.findOne({ "username": enemy.username });
    if (enemyToAdd) {
      const user = await User.findById(req.userId);
      if (user) {
        user.enemies = [...user.enemies, enemyToAdd._id];
        res.json(enemyToAdd);
        await user.save();
      }
      else {
        const error = new Error("Could not find user to add enemie");
        error.code = 404;
        next(error);
      }
    } else {
      const error = new Error("Could not find enemie");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete on addEnemie";
    next(error);
  }
}

const removeEnemy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enemyToRemove = await User.findOne({ _id: id });
    if (enemyToRemove) {
      const user = await User.findById(req.userId);

      if (user) {
        user.enemies = user.enemies.filter((friend) => friend._id.toString() !== enemyToRemove._id.toString())
        res.json(user.enemies);
        await user.save();
      }
      else {
        const error = new Error("Could not find user to remove enemy");
        error.code = 404;
        next(error);
      }
    } else {
      const error = new Error("Could not find enemy");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete on removeEnemy";
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line dot-notation
    const updatedUser = await User.findByIdAndUpdate(req.body['_id'], req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    }
    else {
      const error = new Error("Not posibol to update");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
}

module.exports = {
  getUsers,
  getFriends,
  addFriend,
  removeFriend,
  addEnemy,
  removeEnemy,
  getEnemies,
  updateUser,
  getUserById
}