const joi = require("joi");

exports.checkNewUser = async (req, res, next) => {
	const schema = joi.object({
		username: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkLogin = async (req, res, next) => {
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkNewTask = async (req, res, next) => {
	const schema = joi.object({
		title: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};
