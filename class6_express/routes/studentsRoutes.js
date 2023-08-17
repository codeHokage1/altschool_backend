const express = require("express");
const studentsRoutes = express.Router();

const studentsController = require('../controllers/studentsController');

studentsRoutes
	.get("/", studentsController.getAllStudents)
	.get("/:id", studentsController.getOneStudents)
	.post("/", studentsController.createStudent)
	.put("/:id", (req, res) => {
		return res.send("Update student");
	})
	.delete("/:id", (req, res) => {

    });

module.exports = studentsRoutes;
