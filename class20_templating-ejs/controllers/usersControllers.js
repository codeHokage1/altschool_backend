const jwt = require("jsonwebtoken");
const User = require("../models/User");

const bcrypt = require("bcrypt");

require("dotenv").config();

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});

		return res.json({
			message: "All users",
			data: users
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
			data: null
		});
	}
};

exports.createNewUser = async (req, res) => {
	try {
		// newUser.apiKey = uuidv4();

		// newUser.role = newUser.username === "Farhan" ? "admin" : "user";

		const newUser = await User.create(req.body);
		const token = await jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET);
		return res.status(201).json({
			message: "New user created",
			data: newUser,
			token
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.signinUser = async (req, res) => {
	// console.log(req.body);
	// res.redirect("/users/signin");

	const foundUser = await User.findOne({ email: req.body.email });
	if (!foundUser) {
		return res.status(404).json({
			message: "User not found",
			data: null
		});
	}
	const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
	if (!isMatch) {
		return res.status(401).json({
			message: `Invalid Password for ${foundUser.email}`,
			data: null
		});
	}

	const token = await jwt.sign({ id: foundUser._id, email: foundUser.email }, process.env.JWT_SECRET);
	res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
	// return res.json({
	// 	message: "Login Successful",
	// 	data: foundUser,
	// 	token
	// });
	res.redirect("/views/success");
};
