const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user_id: req.user.id });
		console.log({
			message: "Tasks fetched successfully",
			data: tasks
		});
		res.render("profile", { user: req.user, tasks: tasks });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.createTask = async (req, res) => {
	try {
		const user = req.user;
		const task = await Task.create({
			title: req.body.title,
			user_id: user.id
		});
		console.log({
			message: "Task created successfully",
			data: task
		});
        res.render("profile", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
