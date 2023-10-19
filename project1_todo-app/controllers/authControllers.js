const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("../utils/logger");

exports.signup = async (req, res) => {
	try {
		logger.info("[Create User] => Signup request received");
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

		// console.log({
		// 	message: "User created successfully",
		// 	data: newUser,
		// 	token
		// });
		logger.info("[Create User] => Signup request complete. User created successfully");


		res.redirect("/tasks");
	} catch (error) {
		// console.log(error.message);
		logger.info(`[Create User] => Error: ${error.message}`);
		res.render("register", { error: error.message });
	}
};

exports.signin = async (req, res) => {
	try {
		logger.info("[Login User] => Login request received");

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
		
		// console.log({
		// 	message: "User created successfully",
		// 	data: foundUser,
		// 	token
		// });

		logger.info("[Login User] => Login Complete. User logged in successfully");

		res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
		res.redirect("/tasks");
	} catch (error) {
		// console.log(error.message);
		logger.info(`[Login User] => Error: ${error.message}`);

		res.render("signin", { error: error.message });
	}
};

exports.signout = async (req, res) => {
	try {
		logger.info("[Logout User] => Logout request received");

		res.clearCookie("jwt");
		console.log({
			message: "Logged out successfully",
			data: null
		});
		logger.info("[Logout User] => Logout Complete. User logged out successfully");
		res.redirect("/")
	} catch (error) {
		// console.log(error.message);
		logger.info(`[Login User] => Error: ${error.message}`);

		res.render("signin", { error: error.message });
	}
};

