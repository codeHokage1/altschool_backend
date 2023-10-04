const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.basicAuth = (req, res, next) => {
	const details = new Buffer.from(req.headers.authorization.split(" ")[1], "base64")
		.toString()
		.split(":");
	if (!details) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}
	const [username, password] = details;
	const foundUser = users.find((user) => user.username === username && user.password === password);
	if (!foundUser) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	req.user = foundUser;
	next();
};

exports.apiAuth = async (req, res, next) => {
	const apiKey = await req.headers.api_key;

	if (!apiKey) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}
	const foundUser = users.find((user) => user.apiKey === apiKey);
	if (!foundUser) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	req.user = foundUser;
	next();
};

exports.bearerTokenAuth = async (req, res, next) => {
	const token = await req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}
	const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
	const foundUser = await User.find({ _id: userDetails.id , email: userDetails.email});
	if (!foundUser) {
		return res.status(401).json({
			message: "You are not authorized to access this route. Invalid token.",
			data: null
		});
	}

	console.log(foundUser);
	req.user = foundUser;
	next();
};

exports.checkAdmin = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	next();
};
