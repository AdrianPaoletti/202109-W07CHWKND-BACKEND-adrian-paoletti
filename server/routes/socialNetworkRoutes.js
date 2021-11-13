const express = require("express");
const { getUsers, getFriends, addFriend } = require("../controller/socialNetworkController")

const router = express.Router();

router.get("/", getUsers);
router.get("/friends", getFriends)
router.post("/friends", addFriend)
// router.delete("/friends/:idFriend", deleteFriend)

module.exports = router;