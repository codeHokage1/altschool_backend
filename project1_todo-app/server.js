const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectDB = require("./config/dbConfig");
const { detailsForHome } = require("./middlewares/checkToken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

app.get("/", detailsForHome, (req, res) => {
	res.render("home", { user: req.user });
});

app
	.use("/auth", authRoutes)
	.use("/tasks", taskRoutes)
	.use("/profile", profileRoutes)
	.use("*", (req, res) => {
		res.render("404");
	});

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
