const fs = require("fs").promises;


exports.checkNewUser = (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			message: "Username and password are required",
			data: null
		});
	}
	next();
};

exports.apiAuth = async (req, res, next) => {
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf8"));

    const apiKey = req.headers.api_key;
    if(!apiKey) {
        return res.status(401).json({
            message: "You are not authorized to access this route",
            data: null
        });
    }

    const foundUser = users.find(user => user.apiKey === apiKey);
    if(!foundUser) {
        return res.status(401).json({
            message: "You are not authorized to access this route",
            data: null
        });
    }

    req.user = foundUser;
    next();
};

exports.checkAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message: "You are not authorized to access this route",
            data: null
        });
    }

    next();
};
