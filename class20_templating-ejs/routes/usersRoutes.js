const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");
const { checkNewUser, loginValidation } = require("../middlewares/checkNewUser");

router
	.get("/", usersControllers.getAllUsers)
	.post("/signup", checkNewUser, usersControllers.createNewUser)
	.get("/signin", (req, res) => {
		res.render("login");
	})
	.post("/signin", loginValidation, usersControllers.signinUser);

module.exports = router;
