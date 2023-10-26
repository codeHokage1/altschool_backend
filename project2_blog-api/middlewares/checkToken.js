const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		// const token = req.headers.token;

		if (!token) {
			return res.status(401).json({
			    message: "Kindly Login!",
			    data: null
			});
			// return res.redirect("/auth/signin", {error: null});
		}

		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		// console.log(req.user);

		next();
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.detailsForHome = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		// const token = req.headers.token;

		if (!token) {
			// return res.status(401).json({
			//     message: "Kindly Login!",
			//     data: null
			// });
			req.user = null;
            next();
            return;
		}

		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		// req.user = decoded;

		next();
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
