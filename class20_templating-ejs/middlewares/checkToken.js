const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.checkToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({
				message: "Authentication failed. Please login.",
				data: null
			});
		}
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		console.log(decoded);
		console.log(user.userName);

		req.user = decoded;
		req.userName = user.userName;
		next();
	} catch (error) {
		return res.status(500).json({
			message: error,
			data: null
		});
	}
};
