const express = require("express");
const fs = require("fs").promises;

const studentsRoutes = require("./routes/studentsRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to my API!");
});
app.use("/v1/students", studentsRoutes);

const PORT = 5009;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
