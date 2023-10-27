const Article = require("../models/Article");
const logger = require("../utils/logger");
const { allArticlesQuery, myArticlesQuery } = require("../utils/queryFunctions");

exports.getAllArticles = async (req, res) => {
	try {
		logger.info("[Get All Articles] => Get all Articles request received");
		const userQuery = req.query;

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const authorSearch = userQuery.author;
		const titleSearch = userQuery.title;
		const tagSearch = userQuery.tags;

		const skip = (page - 1) * limit;

		const allArticles = await Article.find(allArticlesQuery(authorSearch, titleSearch, tagSearch))
			.skip(skip)
			.limit(limit);

		const articlesCount = await Article.countDocuments(
			allArticlesQuery(authorSearch, titleSearch, tagSearch)
		);

		logger.info("[Get All articles] => Request complete: all articles gotten");

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
		logger.info(`[Get All Articles] => Error: ${error.message}`);
	}
};

exports.getMyArticles = async (req, res) => {
	try {
		logger.info("[Get All My Articles] => Get all Articles for Logged-in User request received");
		const userQuery = req.query;
		const user = req.user;
		console.log(user, userQuery);

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;

		const allArticles = await Article.find(myArticlesQuery(user.id, userQuery.state))
			.skip(skip)
			.limit(limit);

		const articlesCount = await Article.countDocuments(myArticlesQuery(user.id, userQuery.state));

		logger.info("[Get All My Articles] => Request complete: all tasks for Logged-in user gotten");

		// res.render("task", { user: req.user, tasks: tasks.reverse() });

		return res.json({
			message: `Articles for ${user.first_name} ${user.last_name}:`,
			data: {
				allArticles,
				page,
				limit,
				articlesCount
			}
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Get All My Articles] => Error: ${error.message}`);

		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.getOneArticle = async (req, res) => {
	try {
		logger.info("[Get One Article by ID] => Get One Article request received");

		const articleId = req.params.id;
		const foundArticle = await Article.findById(articleId);
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}
		foundArticle.read_count += 1;
		foundArticle.save();

		logger.info("[Get One Article by ID] => Request Complete: One article gotten");

		return res.status(200).json({
			message: "Article fetched successfully",
			data: foundArticle
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Get One Article by ID] => Error: ${error.message}`);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.createArticle = async (req, res) => {
	try {
		logger.info("[Create Article] => Create Article request received");

		const user = req.user;
		const article = await Article.create({
			...req.body,
			author: `${user.first_name} ${user.last_name}`,
			author_id: `${req.user.id}`,
			reading_time: 10
		});

		// res.render("task", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });

		logger.info("[Create Article] => Request Complete: Article created");

		return res.status(201).json({
			message: "Article created successfully",
			data: article
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Create Article] => Error: ${error.message}`);

		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.updateArticle = async (req, res) => {
	try {
		logger.info("[Update One Article by ID] => Update One Article request received");

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

		logger.info("[Update One Article by ID] => Request Complete: Updated article");

		return res.status(201).json({
			message: "Article Updated successfully",
			data: article
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Update One Article by ID] => Error: ${error.message}`);

		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.deleteOneArticle = async (req, res) => {
	try {
		logger.info("[Delete Article] => Delete One Article request received");

		const articleId = req.params.id;
		const foundArticle = await Article.findOne({ _id: articleId });
		if (!foundArticle) {
			return res.status(404).json({
				message: "Article not found!",
				data: null
			});
		}

		const deletedArticle = await Article.findByIdAndDelete(articleId);
		logger.info("[Delete Article] => Request Complete: One article deleted");

		return res.status(200).json({
			message: "Article deleted successfully",
			data: deletedArticle
		});
	} catch (error) {
		console.log(error.message);
		logger.info(`[Delete Article] => Error: ${error.message}`);

		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
