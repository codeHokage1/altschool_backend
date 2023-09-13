const users = require("../data/users");
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const UserModel = require("../models/user");

const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = async(req, res) => {
	const usersSQL = await UserModel.findAll();
	res.json({
		message: "All users",
		data: usersSQL
	});
};

exports.createNewUser = (req, res) => {
	const newUser = req.body;
	newUser.apiKey = uuidv4();

	newUser.role = newUser.username === "Farhan" ? "admin" : "user";

	users.push(newUser);
	res.status(201).json({
		message: "New user created",
		data: req.body
	});
};
