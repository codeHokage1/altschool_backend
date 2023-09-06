const express = require("express");
const app = express();

const usersRoutes = require("./routes/usersRoutes");
const studentsRoutes = require("./routes/studentsRoutes");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to my API!");
});

app.use("/users", usersRoutes);
app.use("/students", studentsRoutes);
app.use("*", (req, res) => {
	res.status(404).json({
		message: "This route does not exist.",
		data: null
	});
});

const PORT = 5009;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
