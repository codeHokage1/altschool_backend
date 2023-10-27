const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const connectDB = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

app.get("/", (req, res) => {
	// res.render("home", { user: req.user });
	res.json({
		message: "Welcome to my blog API"
	})
});

app
	.use("/auth", authRoutes)
	.use("/articles", articlesRoutes)
	.use("*", (req, res) => {
		// res.render("404");
		res.status(404).json({
			message: "Route not found"
		})
	});

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
