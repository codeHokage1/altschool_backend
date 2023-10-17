const dayjs = require("dayjs");
dayjs().format();
const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
	try {
		const userStateQuery = req.query.state;
		let tasks = await Task.find({ user_id: req.user.id });
		if (userStateQuery) {
			let tempArr = [];
			tasks.forEach((task) => {
				if (task.state === userStateQuery) {
					tempArr.push(task);
				}
			});
			tasks.forEach((task) => {
				if (task.state !== userStateQuery) {
					tempArr.push(task);
				}
			});
			tasks = tempArr;
			return res.render("task", { user: req.user, tasks: tasks });
		}

		console.log({
			message: "Tasks fetched successfully",
			data: tasks
		});
		res.render("task", { user: req.user, tasks: tasks.reverse() });
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
		res.render("task", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.updateTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
		console.log({
			message: "Task Updated successfully",
			data: task
		});
		res.render("task", { user: req.user, tasks: await Task.find({ user_id: req.user.id }) });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
