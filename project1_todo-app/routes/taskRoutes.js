const router = require("express").Router();
const taskController = require("../controllers/taskControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const {checkNewTask} = require("../middlewares/validateRequest");

router
	.use(isLoggedIn)
	.get("/", taskController.getAllTasks)
	.post("/", checkNewTask, taskController.createTask)
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
