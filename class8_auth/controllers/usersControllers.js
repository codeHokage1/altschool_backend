const users = require("../data/users");
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = (req, res) => {
	res.json({
		message: "All users",
		data: users
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
