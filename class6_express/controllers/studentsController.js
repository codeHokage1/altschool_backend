const fs = require("fs").promises;

// Get all students
exports.getAllStudents = async (req, res) => {
	try {
		const students = await fs.readFile("./data/students.json", "utf8");
		return res.status(200).json({
			message: "All students",
			data: JSON.parse(students)
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Get one students
exports.getOneStudents = async (req, res) => {
	const id = req.params.id;
	try {
		const students = JSON.parse(await fs.readFile("./data/students.json", "utf8"));
		const foundStudent = students.find((student) => student.id === Number(id));
		if (!foundStudent) {
			return res.status(404).json({
				message: "Student not found",
				data: null
			});
		}

		return res.status(200).json({
			message: "Student found",
			data: foundStudent
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Create new student
exports.createStudent = async (req, res) => {
	const newStudent = {
		id: Math.floor(Math.random() * 100) + 1,
		...req.body
	};
	try {
		const students = JSON.parse(await fs.readFile("./data/students.json", "utf8"));
		students.push(newStudent);
		await fs.writeFile("./data/students.json", JSON.stringify(students), (err) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
					data: null
				});
			}

			console.log("New student added to the database");
		});

		return res.status(201).json({
			message: "New student added",
			data: newStudent
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};
