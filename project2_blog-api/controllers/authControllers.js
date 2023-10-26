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
			{
				id: newUser._id,
				first_name: newUser.first_name,
				last_name: newUser.last_name,
				email: newUser.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

		logger.info("[Create User] => Signup request complete. User created successfully");
		return res.status(201).json({
			message: "User created successfully",
			data: newUser,
			token
		});

		// res.redirect("/tasks");
	} catch (error) {
		console.log(error.message);
		logger.info(`[Create User] => Error: ${error.message}`);
		// res.render("register", { error: error.message });
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.signin = async (req, res) => {
	try {
		logger.info("[Login User] => Login request received");

		const foundUser = await User.findOne({ email: req.body.email });
		if (!foundUser) {
			// return res.render("signin", { error: "User not found!" });
			return res.status(404).json({
				message: "User not found!",
				data: null
			});
		}

		const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
		if (!isMatch) {
			// return res.render("signin", { error: "Incorrect Password!" });
			return res.status(401).json({
				message: "Incorrect Password!",
				data: null
			});
		}

		const token = await jwt.sign(
			{
				id: foundUser._id,
				first_name: foundUser.first_name,
				last_name: foundUser.last_name,
				email: foundUser.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);


		logger.info("[Login User] => Login Complete. User logged in successfully");

		res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
		// res.redirect("/tasks");

		return res.status(200).json({
			message: "User signed in successfully",
			data: foundUser,
			token
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Login User] => Error: ${error.message}`);

		// res.render("signin", { error: error.message });

		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.signout = async (req, res) => {
	try {
		logger.info("[Logout User] => Logout request received");

		res.clearCookie("jwt");

		logger.info("[Logout User] => Logout Complete. User logged out successfully");
		
		return res.json({
			message: "Logged out successfully",
			data: null
		});
		// res.redirect("/");
	} catch (error) {
		// console.log(error.message);
		logger.info(`[Login User] => Error: ${error.message}`);

		res.render("signin", { error: error.message });
	}
};
