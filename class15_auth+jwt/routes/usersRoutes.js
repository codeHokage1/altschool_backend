const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");
const { checkNewUser, loginValidation } = require("../middlewares/checkNewUser");

router
	.get("/", usersControllers.getAllUsers)
	.post("/signup", checkNewUser, usersControllers.createNewUser)
	.post("/signin", loginValidation, usersControllers.signinUser);

module.exports = router;
