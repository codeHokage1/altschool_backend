const router = require("express").Router();

router
	.get("/", (req, res) => {
		res.send("GET All tasks");
	})
	.post("/", (req, res) => {
		res.send("POST Create task");
	})
	.get("/:id", (req, res) => {
		res.send("GET One task");
	})
	.put("/:id", (req, res) => {
		res.send("PUT Update one task");
	})
	.delete("/:id", (req, res) => {
		res.send("DLETE Delete One task");
	});

module.exports = router;
