const express = require("express");
const studentsRoutes = express.Router();

const studentsController = require('../controllers/studentsController');

studentsRoutes
	.get("/", studentsController.getAllStudents)
	.get("/:id", studentsController.getOneStudents)
	.post("/", studentsController.createStudent)
	.put("/:id", studentsController.updateStudent)
	.delete("/:id", studentsController.deleteStudent);

module.exports = studentsRoutes;
