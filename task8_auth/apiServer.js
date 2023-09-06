const express = require("express");
const fs = require("fs").promises;

const itemsRoutes = require("./routes/itemsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to my API!");
});
app.use("/v1/items", itemsRoutes);
app.use("/v1/users", usersRoutes);

const PORT = 5011;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
