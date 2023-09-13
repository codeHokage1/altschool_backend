const express = require("express");
const app = express();

const usersRoutes = require("./routes/usersRoutes");
const studentsRoutes = require("./routes/studentsRoutes");

const sequelize = require("./config/dbConfig");

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

sequelize
	.authenticate()
	.then(() => {
		console.log("DB Connected successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
