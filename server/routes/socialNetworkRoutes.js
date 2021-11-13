const express = require("express");
const { getUsers, getFriends, addFriend, removeFriend } = require("../controller/socialNetworkController")

const router = express.Router();

router.get("/", getUsers);
router.get("/friends", getFriends)
router.post("/friends/add", addFriend)
router.delete("/friends/:id", removeFriend)

module.exports = router;