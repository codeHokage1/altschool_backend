const express = require("express");
const fs = require("fs").promises;

const itemsRoutes = require("./routes/itemsRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to my API!");
});
app.use("/v1/items", itemsRoutes);

const PORT = 5010;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
