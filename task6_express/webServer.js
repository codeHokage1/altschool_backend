const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const publicPath = path.join(__dirname, "views");
app.use(express.static(publicPath));

app.get("/" || "/.index.html", async (req, res) => {
	const filePath = path.join(publicPath, "index.html");
	try {
		const file = await fs.readFile(filePath, "utf-8");
		return res.sendFile(file);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: "Internal Server Error", message: error.message });
	}
});

app.get("*", async (req, res) => {
	const filePath = path.join(publicPath, "404.html");
	try {
		// const file = await fs.readFile(filePath, "utf-8");
		return res.sendFile(filePath);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: "Internal Server Error", message: error.message });
	}
});

const PORT = 5008;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
