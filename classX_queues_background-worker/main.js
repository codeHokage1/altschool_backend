const express = require("express");
const app = express();

const { WorkQueue } = require("./queue");

app.use(express.json());

app.post("/app", (req, res) => {
	WorkQueue().addToQueue({...req.body, jobName: "SendEmail"});
	res.json({
		message: "Hello there!"
	});
});

app.listen(3008, () => {
	console.log("Server running on PORT 3008...");
});
