const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = async (req, res) => {
	const users = JSON.parse(await fs.readFile(`./data/users.json`, "utf8"));

	res.json({
		message: "All users",
		data: users
	});
};

exports.createNewUser = async (req, res) => {
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf8"));

	const newUser = req.body;
	const foundUser = users.find((user) => user.username === newUser.username);
	if (foundUser) {
		return res.status(409).json({
			message: "Username already exists",
			data: null
		});
	}

	newUser.apiKey = uuidv4();
	newUser.role = newUser.username === "Farhan" ? "admin" : "user";

	users.push(newUser);
	try {
		await fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
					data: null
				});
			}

			console.log("New User added to the database");
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}

	res.status(201).json({
		message: "New user created",
		data: req.body
	});
};
