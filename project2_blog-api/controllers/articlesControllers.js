const Article = require("../models/Article");
const logger = require("../utils/logger");

exports.getAllArticles = async (req, res) => {
	try {
		logger.info("[Get All Articles] => Get all Articles request received");
		const userQuery = req.query;

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		// const sortBy = req.query.sortBy || "createdAt"; // Default sorting field
		// const order = req.query.order || "asc"; // Default sorting order

		const skip = (page - 1) * limit;

		const allArticles = await Article.find()
			// .sort({ [sortBy]: order })
			.skip(skip)
			.limit(limit);

		const articlesCount = await Article.countDocuments();

		logger.info("[Get All Tasks] => Get all tasks request complete");

		// res.render("task", { user: req.user, tasks: tasks.reverse() });

		return res.json({
			message: "All Articles fetched successfully",
			data: {
				allArticles,
				page,
				limit,
				articlesCount
			}
		});

	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
		logger.info(`[Get All Tasks] => Error: ${error.message}`);
	}
};

exports.getOneArticle = async (req, res) => {
	try {
		const articleId = req.params.id;
		console.log(articleId);
		const foundArticle = await Article.findById(articleId);
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}
		foundArticle.read_count += 1;
		foundArticle.save();

		return res.status(200).json({
			message: "Article fetched successfully",
			data: foundArticle
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.createArticle = async (req, res) => {
	try {
		const user = req.user;
		const article = await Article.create({
			...req.body,
			author: `${user.first_name} ${user.last_name}`,
			author_id: `${req.user.id}`,
			reading_time: 10
		});

		// res.render("task", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });

		return res.status(201).json({
			message: "Article created successfully",
			data: article
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.updateArticle = async (req, res) => {
	try {
		const articleId = req.params.id;
		const foundArticle = await Article.findOne({ _id: articleId });
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}
		const article = await Article.findOneAndUpdate({ _id: articleId }, req.body);
		// res.render("task", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });

		return res.status(201).json({
			message: "Article Updated successfully",
			data: article
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.deleteOneArticle = async (req, res) => {
	try {
		const articleId = req.params.id;
		const foundArticle = await Article.findOne({ _id: articleId });
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}

		const deletedArticle = await Article.findByIdAndDelete(articleId);

		return res.status(200).json({
			message: "Article deleted successfully",
			data: deletedArticle
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
