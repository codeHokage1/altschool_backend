const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/usersRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const connectDB = require("./config/dbConfig");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
	// res.send("Welcome to my API!");
	res.render("home");
});
app.get("/views/success", require("./middlewares/checkToken").checkToken, (req, res) => {
	res.render("success", {user: req.user, userName: req.userName});
});

app.use("/users", usersRoutes);
app.use("/students", studentsRoutes);
app.use("*", (req, res) => {
	res.status(404).json({
		message: "This route does not exist.",
		data: null
	});
});

const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
