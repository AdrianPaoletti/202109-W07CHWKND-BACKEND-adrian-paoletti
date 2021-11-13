const express = require("express");
const { getUsers } = require("../controller/socialNetworkController")

const router = express.Router();

router.use("/", getUsers);

module.exports = router;