const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
	// res.render("home", { user: req.user });
	res.send("Welcome to my blog API!");
});

app
	.use("/auth", authRoutes)
	.use("/articles", articlesRoutes)
	.use("*", (req, res) => {
		// res.render("404");
		return res.status(404).json({
			message: "Route not found"
		});
	});

module.exports = app;

