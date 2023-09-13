const students = require('../data/students');

exports.getAllStudents = (req, res) => {
	res.json({
        message: "All students",
        data: students
    })
}

exports.createNewStudent = (req, res) => {
    students.push(req.body);
    res.status(201).json({
        message: "New user created",
        data: req.body
    });
}