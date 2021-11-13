const express = require("express");
const { getUsers, getFriends, addFriend, removeFriend, addEnemy, removeEnemy, getEnemies, updateUser } = require("../controller/socialNetworkController")

const router = express.Router();

router.get("/", getUsers);
router.get("/friends", getFriends)
router.post("/friends/add", addFriend)
router.delete("/friends/:id", removeFriend)
router.get("/enemies", getEnemies)
router.post("/enemies/add", addEnemy)
router.delete("/enemies/:id", removeEnemy)
router.put("/update", updateUser);

module.exports = router;