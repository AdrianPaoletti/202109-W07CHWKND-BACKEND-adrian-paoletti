const express = require("express");
const { validate } = require("express-validation")
const { registerUser, loginUser } = require("../controller/usersController");
const { loginSchema, registerSchema } = require("../schemas/userSchema")

const router = express.Router();

router.use("/register", validate(registerSchema), registerUser);
router.use("/login", validate(loginSchema), loginUser);

module.exports = router;