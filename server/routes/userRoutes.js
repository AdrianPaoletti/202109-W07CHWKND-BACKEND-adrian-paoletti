const express = require("express");
const { validate } = require("express-validation");
const { registerUser, loginUser } = require("../controller/usersController")

const router = express.Router();

router.use("/register", registerUser);
router.use("/login", loginUser);

module.exports = router;