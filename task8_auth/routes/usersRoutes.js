const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");
const auth = require("../middlewares/auth");

router
	.get("/", usersControllers.getAllUsers)
	.post("/", auth.checkNewUser, usersControllers.createNewUser);

module.exports = router;
