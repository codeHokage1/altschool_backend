const jwt = require("jsonwebtoken");
const Article = require("../models/Article");

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
		// console.log("done here")
		next();
	} catch (error) {
		// console.log("error here")
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.isAuthor = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		// const token = req.headers.token;

		if (!token) {
			return res.status(401).json({
			    message: "Kindly Login!",
			    data: null
			});
		}

		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		// req.user = decoded;
		const articleId = req.params.id;
		const foundArticle = await Article.findOne({ _id: articleId });
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}

		if (decoded.id != foundArticle.author_id) {
			return res.status(401).json({
				message: "You are not authorized to perform this action!",
				data: null
			});
		}



		next();
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
