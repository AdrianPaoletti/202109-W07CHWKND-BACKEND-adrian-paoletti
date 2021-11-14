const express = require("express");
const auth = require("../middlewares/auth")
const { getUsers, getFriends, addFriend, removeFriend, addEnemy, removeEnemy, getEnemies, updateUser } = require("../controller/socialNetworkController")

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/friends", auth, getFriends)
router.post("/friends/add", auth, addFriend)
router.delete("/friends/:id", auth, removeFriend)
router.get("/enemies", auth, getEnemies)
router.post("/enemies/add", auth, addEnemy)
router.delete("/enemies/:id", auth, removeEnemy)
router.put("/update", auth, updateUser);

module.exports = router;