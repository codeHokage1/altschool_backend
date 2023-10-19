const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
	try {
		const newUser = await User.create({
			...req.body,
			password: await bcrypt.hash(req.body.password, 10)
		});

		const token = await jwt.sign(
			{ id: newUser._id, username: newUser.username, email: newUser.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

		console.log({
			message: "User created successfully",
			data: newUser,
			token
		});

		res.redirect("/tasks");
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.signin = async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email });
		if (!foundUser) {
			return res.render("signin", { error: "User not found!" });
		}

		const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
		if (!isMatch) {
			return res.render("signin", { error: "Incorrect Password!" });

		}

		const token = await jwt.sign(
			{ id: foundUser._id, username: foundUser.username, email: foundUser.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);
		
		console.log({
			message: "User created successfully",
			data: foundUser,
			token
		});
		res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
		res.redirect("/tasks");
	} catch (error) {
		console.log(error.message);
		// console({
		// 	message: error.message,
		// 	data: null
		// });
		res.render("signin", { error: error.message });
	}
};

exports.signout = async (req, res) => {
	try {
		res.clearCookie("jwt");
		console.log({
			message: "Logged out successfully",
			data: null
		});
		res.redirect("/")
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			message: "All users",
			data: users
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
