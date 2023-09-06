const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");
const {checkNewUser} = require("../middlewares/checkNewUser");

router
	.get("/", usersControllers.getAllUsers)
	.post("/", checkNewUser, usersControllers.createNewUser);

module.exports = router;
