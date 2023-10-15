const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user.id });
        res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

exports.createTask = async (req, res) => {
    try {
        const user = req.user;
        const task = await Task.create({
            title: req.body.title,
            user_id: user.id
        });
        res.status(201).json({
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}