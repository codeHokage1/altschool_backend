const express = require("express");
const connectDB = require("./config/dbConfig");
const { connect } = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Paystack Integ - By Farhan");
});

app.post("/init");

app.listen(4500, () => {
   connectDB();
	console.log("Server on PORT 4500...");
});
