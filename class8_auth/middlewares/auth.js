const users = require('../data/users');

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
	const foundUser = users.find(user => user.username === username && user.password === password);
	if (!foundUser) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	req.user = foundUser;
	next();
};

exports.apiAuth = async(req, res, next) => {
	const apiKey = await req.headers.api_key;

	if (!apiKey) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}
	const foundUser = users.find(user => user.apiKey === apiKey);
	if (!foundUser) {
		return res.status(401).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	req.user = foundUser;
	next();
};

exports.checkAdmin = (req, res, next) => {
	if(req.user.role !== 'admin'){
		return res.status(403).json({
			message: "You are not authorized to access this route.",
			data: null
		});
	}

	next();
}