const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectDB = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app
	.use("/auth", authRoutes)
	.use("/tasks", taskRoutes)
	.use("/profile", profileRoutes)
	.use("*", (req, res) => {
		res.status(404).send("404 Not Found");
	});

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
